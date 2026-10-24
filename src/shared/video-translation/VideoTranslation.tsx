import { useMemo, useState } from 'react';
import type { VideoMap } from '../../hooks/useVideoMap';

interface VideoTranslationProps {
  word: string;
  videoMap: VideoMap;
}

type VideoStatus = 'loading' | 'error' | 'success';

const R2_BASE_URL = "https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/sinalize-public-project";

const normalizeWord = (str: string) => 
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

// Resolve a URL do vídeo para a palavra pesquisada.
// Retorna null quando a palavra não existe no mapa (estado de erro).
function resolveVideoUrl(word: string, videoMap: VideoMap): string | null {
  const normalized = normalizeWord(word);
  let finalWord = normalized;
  let videoId = videoMap[finalWord];

  // Fallback do número 1
  if (!videoId) {
    finalWord = `${normalized}1`;
    videoId = videoMap[finalWord];
  }

  if (!videoId) return null;

  return `${R2_BASE_URL}/${finalWord}__${videoId}.mp4`;
}

export function VideoTranslation({ word, videoMap }: VideoTranslationProps) {
  // URL derivada: recalcula apenas quando a palavra ou o mapa mudam,
  // sem precisar de setState dentro de um efeito.
  const videoUrl = useMemo(
    () => (word ? resolveVideoUrl(word, videoMap) : null),
    [word, videoMap]
  );

  // Estado de mídia atrelado à URL atual. Como cada URL só pode estar em um
  // estado (carregando / falhou / carregou), guardamos a URL e comparamos,
  // evitando reset manual de estado a cada nova busca.
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  const status: VideoStatus = !videoUrl
    ? 'error'
    : failedUrl === videoUrl
      ? 'error'
      : loadedUrl === videoUrl
        ? 'success'
        : 'loading';

  if (!word) return null;

  return (
    <section className="w-full max-w-md bg-[#ffffff] border border-gray-100 p-4 rounded-xl shadow-sm mb-8 transition-all">
      <p className="text-sm text-[#6b7280] font-semibold mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-[#0d9488]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
          </path>
        </svg>
        Tradução em Vídeo (Acessibilidade Brasil)
      </p>

      <div className="relative w-full aspect-video bg-[#fafaf9] rounded-lg overflow-hidden border border-[#9ca3af] flex items-center justify-center">
        
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <span className="text-sm text-[#0d9488] font-medium animate-pulse">Buscando vídeo...</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <svg className="w-8 h-8 text-[#6b7280] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636">
              </path>
            </svg>
            <span className="text-sm text-[#6b7280] font-medium">Vídeo indisponível para esta palavra.</span>
          </div>
        )}

        {/* referrerPolicy="no-referrer" - APENAS se houver problema com o CORS*/}
        {videoUrl && (
            
          <video
            className={`w-full h-full object-cover ${status === 'success' ? 'block' : 'hidden'}`}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            onCanPlay={() => setLoadedUrl(videoUrl)}
            onError={() => setFailedUrl(videoUrl)}
          />
        )}
      </div>
    </section>
  );
}
