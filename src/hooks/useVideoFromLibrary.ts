// hooks/useVideoFromLibrary.ts
import { useMemo } from 'react';
import curatedVideosData from '../assets/curated_videos.json';
import type { CuratedVideo } from '../types/curatedVideo.ts';

const typedCuratedVideos = curatedVideosData as CuratedVideo[];

/**
 * Hook para buscar videos (futuramente pelas tags).
 * @param videoTags Array de tags de videos a serem buscados.
 * @returns Array de videos correspondentes às tags fornecidas.
 */
export function useVideosByTags(videoTags: string[]): CuratedVideo[] {

    // useMemo garante que o filtro só seja executado novamente se videoTags mudar
    const videos = useMemo(() => {
        // Validação de segurança
        if (!Array.isArray(videoTags) || videoTags.length === 0) {
            return [];
        }

        // Filtra os flashcards que correspondem às tags fornecidas
        return typedCuratedVideos.filter((video) => 
            video.tags.some(tag => videoTags.includes(tag))
        );

    }, [videoTags])

    return videos;
}