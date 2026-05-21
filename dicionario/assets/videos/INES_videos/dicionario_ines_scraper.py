"""
INES Libras Dictionary — sign-language video scraper.

Downloads every sign-language video from https://dicionario.ines.gov.br
into ./videos/ (relative to the directory you run the script from).

Why no Playwright: the site's entire word index is a single static JS
file (`public/site/js/palavras.js`) — `var palavras = [{...}, ...]` —
and every word's video is a direct MP4 at
`public/media/palavras/videos/<filename>`. So a plain HTTP scrape is
faster, deterministic, and resumable. A Playwright fallback is sketched
at the bottom for the day INES restructures the site.

Highest quality available: 240×176 H.264 ~5 s clips, ~50 KB each.
There is no `Lg`/`Hd` variant on the server — those URLs return 404.

Usage:
    pip install httpx tqdm
    python dicionario_ines_scraper.py
    python dicionario_ines_scraper.py --out ./libras_videos
    python dicionario_ines_scraper.py --letter A --workers 16
    python dicionario_ines_scraper.py --use-video-filename

Outputs:
    <out>/videos/<safe-palavra>__<id>.mp4   (or original filename)
    <out>/manifest.csv                       (palavra, id, video, file, status, bytes)

Re-runs skip files that already exist with the right size. Safe to Ctrl-C
and restart at any point.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any

try:
    import httpx
except ModuleNotFoundError:
    sys.exit("Install httpx first:  pip install httpx tqdm")

try:
    from tqdm import tqdm
except ModuleNotFoundError:
    # tqdm is optional; degrade gracefully.
    def tqdm(iterable=None, **_kwargs):  # type: ignore
        return iterable if iterable is not None else iter(())

BASE = "https://dicionario.ines.gov.br"
INDEX_URL = f"{BASE}/public/site/js/palavras.js"
VIDEO_BASE = f"{BASE}/public/media/palavras/videos"
USER_AGENT = (
    "Mozilla/5.0 (compatible; LibrasScraper/1.0; "
    "+https://dicionario.ines.gov.br/)"
)


def fetch_index(client: httpx.Client) -> list[dict[str, Any]]:
    """Download palavras.js and return the parsed list of word records."""
    print(f"→ fetching index from {INDEX_URL}")
    r = client.get(INDEX_URL, timeout=60)
    r.raise_for_status()
    # The site is served as ISO-8859-1 (latin-1).
    text = r.content.decode("latin-1")
    match = re.search(r"var\s+palavras\s*=\s*(\[.+\])\s*;?\s*$", text, re.S)
    if not match:
        raise SystemExit(
            "palavras.js layout changed — couldn't find `var palavras = [...]`."
        )
    data = json.loads(match.group(1))
    print(f"  found {len(data)} word entries")
    return data


def slugify(value: str) -> str:
    """Filesystem-safe ASCII slug: 'Ã€ VISTA' → 'a-vista'."""
    if not value:
        return "word"
    normalised = unicodedata.normalize("NFKD", value)
    ascii_only = "".join(c for c in normalised if not unicodedata.combining(c))
    ascii_only = ascii_only.encode("ascii", "ignore").decode()
    cleaned = re.sub(r"[^A-Za-z0-9]+", "-", ascii_only).strip("-").lower()
    return cleaned or "word"


def target_name(entry: dict[str, Any], use_video_filename: bool) -> str:
    """Pick the on-disk filename for a word's video."""
    video = entry.get("video") or ""
    if not video:
        return ""
    if use_video_filename:
        return video
    slug = slugify(entry.get("palavra") or "")
    return f"{slug}__{entry['id']}.mp4"


def download_one(
    client: httpx.Client,
    entry: dict[str, Any],
    out_dir: Path,
    use_video_filename: bool,
) -> tuple[dict[str, Any], str, int]:
    """Download one video. Returns (entry, status, bytes_written)."""
    video = entry.get("video") or ""
    if not video:
        return entry, "skipped:no-video", 0

    url = f"{VIDEO_BASE}/{video}"
    out_file = out_dir / target_name(entry, use_video_filename)

    # HEAD first so we can resume cleanly: if the local file matches the
    # remote Content-Length we treat it as already done.
    try:
        head = client.head(url, timeout=30, follow_redirects=True)
    except httpx.HTTPError as err:
        return entry, f"error:head:{err.__class__.__name__}", 0
    if head.status_code == 404:
        return entry, "missing:404", 0
    if head.status_code >= 400:
        return entry, f"error:head:{head.status_code}", 0
    expected = int(head.headers.get("content-length", "0") or 0)

    if out_file.exists() and expected and out_file.stat().st_size == expected:
        return entry, "ok:cached", out_file.stat().st_size

    # Stream download to a .part file, then rename. Range-resume if the
    # part file already has bytes.
    part = out_file.with_suffix(out_file.suffix + ".part")
    have = part.stat().st_size if part.exists() else 0
    headers = {}
    if 0 < have < expected:
        headers["Range"] = f"bytes={have}-"
    mode = "ab" if headers.get("Range") else "wb"

    try:
        with client.stream(
            "GET", url, headers=headers, timeout=120, follow_redirects=True
        ) as resp:
            if resp.status_code not in (200, 206):
                return entry, f"error:get:{resp.status_code}", 0
            with part.open(mode) as fh:
                for chunk in resp.iter_bytes(chunk_size=64 * 1024):
                    if chunk:
                        fh.write(chunk)
    except httpx.HTTPError as err:
        return entry, f"error:get:{err.__class__.__name__}", 0

    final_size = part.stat().st_size
    if expected and final_size != expected:
        return entry, f"error:size:{final_size}!={expected}", final_size

    part.replace(out_file)
    return entry, "ok:downloaded", final_size


def write_manifest(out_dir: Path, rows: list[dict[str, Any]]) -> None:
    """Dump a CSV with every word's metadata + download status."""
    manifest = out_dir / "manifest.csv"
    cols = [
        "id",
        "ident",
        "letra",
        "palavra",
        "video",
        "file",
        "status",
        "bytes",
        "descricao",
        "exemplo",
        "libras",
    ]
    with manifest.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=cols)
        writer.writeheader()
        for row in rows:
            writer.writerow({k: row.get(k, "") for k in cols})
    print(f"→ manifest written to {manifest}")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Download every Libras video from dicionario.ines.gov.br"
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=Path.cwd(),
        help="Base output dir (videos go in <out>/videos/). Default: cwd.",
    )
    parser.add_argument(
        "--letter",
        default=None,
        help="Filter to a single letter, e.g. --letter A. Default: all.",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=8,
        help="Concurrent downloads (default 8).",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Stop after N successful downloads (0 = no limit). Use to dry-run.",
    )
    parser.add_argument(
        "--use-video-filename",
        action="store_true",
        help=(
            "Save with the server's original filename (e.g. abacateSm_Prog001.mp4)"
            " instead of the human-readable slug (default: slugged)."
        ),
    )
    args = parser.parse_args()

    out_root: Path = args.out.expanduser().resolve()
    videos_dir = out_root / "videos"
    videos_dir.mkdir(parents=True, exist_ok=True)
    print(f"→ saving videos under {videos_dir}")

    headers = {"User-Agent": USER_AGENT, "Referer": BASE + "/"}
    with httpx.Client(headers=headers, http2=False) as client:
        entries = fetch_index(client)

        if args.letter:
            wanted = args.letter.upper()
            entries = [e for e in entries if (e.get("letra") or "").upper() == wanted]
            print(f"  letter filter '{wanted}' → {len(entries)} entries")

        # Deduplicate: many words share a video file. Download each
        # underlying video once; the manifest still lists every word.
        seen: set[str] = set()
        download_queue: list[dict[str, Any]] = []
        for entry in entries:
            video = entry.get("video") or ""
            key = target_name(entry, args.use_video_filename)
            if not key:
                continue
            if key in seen:
                continue
            seen.add(key)
            download_queue.append(entry)
        print(
            f"  {len(download_queue)} unique video targets "
            f"({len(entries) - len(download_queue)} duplicates skipped)"
        )

        rows: list[dict[str, Any]] = []
        ok = 0
        failed = 0
        cached = 0
        with ThreadPoolExecutor(max_workers=args.workers) as pool:
            futures = {
                pool.submit(
                    download_one,
                    client,
                    entry,
                    videos_dir,
                    args.use_video_filename,
                ): entry
                for entry in download_queue
            }
            progress = tqdm(
                as_completed(futures),
                total=len(futures),
                desc="videos",
                unit="vid",
            )
            for fut in progress:
                entry, status, n_bytes = fut.result()
                if status.startswith("ok:downloaded"):
                    ok += 1
                elif status.startswith("ok:cached"):
                    cached += 1
                else:
                    failed += 1
                rows.append(
                    {
                        **entry,
                        "file": target_name(entry, args.use_video_filename),
                        "status": status,
                        "bytes": n_bytes,
                    }
                )
                if args.limit and (ok + cached) >= args.limit:
                    print(f"\n  limit {args.limit} reached, stopping early")
                    # Cancel pending futures so we exit cleanly.
                    for f in futures:
                        f.cancel()
                    break

        # Reattach manifest rows for any words that share an already-downloaded
        # video file (we only queued the first occurrence above).
        queued_videos = {e.get("video") for e in download_queue}
        for entry in entries:
            video = entry.get("video") or ""
            if video and entry not in [r for r in rows] and video in queued_videos:
                # Reflect the underlying download's status.
                match = next((r for r in rows if r.get("video") == video), None)
                rows.append(
                    {
                        **entry,
                        "file": target_name(entry, args.use_video_filename),
                        "status": match["status"] if match else "alias",
                        "bytes": match["bytes"] if match else 0,
                    }
                )

        print(
            f"\nDone. downloaded={ok} cached={cached} failed={failed} "
            f"(out of {len(download_queue)})"
        )
        write_manifest(out_root, rows)


# ---------------------------------------------------------------------------
# Playwright fallback (only useful if INES ever restructures the site).
# Uncomment and `pip install playwright && playwright install chromium` first.
# ---------------------------------------------------------------------------
#
# from playwright.sync_api import sync_playwright
#
# def playwright_video_urls() -> list[str]:
#     """Crawl letters A-Z, click every word entry, capture the rendered
#     <video><source src> URL. Returns a flat list of absolute video URLs."""
#     found: set[str] = set()
#     with sync_playwright() as pw:
#         browser = pw.chromium.launch(headless=True)
#         page = browser.new_page()
#         page.goto(f"{BASE}/", wait_until="networkidle")
#         for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
#             page.click(f"#letter-{letter}")
#             # Wait for the word <select id="input-palavras"> to populate.
#             page.wait_for_function(
#                 "() => document.querySelectorAll('#input-palavras option').length > 0"
#             )
#             options = page.eval_on_selector_all(
#                 "#input-palavras option", "els => els.map(e => e.value)"
#             )
#             for value in options:
#                 page.select_option("#input-palavras", value)
#                 # functions.js renders <video><source src="public/.../X.mp4">.
#                 src = page.eval_on_selector(
#                     "#input-video source",
#                     "el => el.getAttribute('src')",
#                     timeout=3000,
#                 )
#                 if src:
#                     found.add(src if src.startswith("http") else f"{BASE}/{src}")
#         browser.close()
#     return sorted(found)


if __name__ == "__main__":
    main()
