import { useState, useEffect } from 'react';

export type VideoMap = Record<string, string>;

export function useVideoMap() {
    const [videoMap, setVideoMap] = useState<VideoMap>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMap = async () => {
            try {
                // No Vite, arquivos na pasta public/ são acessados pela raiz absoluta
                const response = await fetch('../../public/assets/videos_map.json');
                if (!response.ok) throw new Error("Erro na rede ao buscar json");
                const data: VideoMap = await response.json();
                setVideoMap(data);
            } catch (error) {
                console.error("Falha ao carregar o mapa de vídeos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMap();
    }, []);

    return { videoMap, isLoading };
}