import { useState } from 'react';
import { useVideosByTags } from '../hooks/useVideoFromLibrary.ts';
import curatedVideosData from '../assets/curated_videos.json';
import type { CuratedVideo } from '../types/curatedVideo.ts';

const allVideos = curatedVideosData as CuratedVideo[];

// Definir todas as tags disponíveis
const AVAILABLE_TAGS = ['Com Legenda', 'Mão Surd@', 'Com Áudio'];

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
};

// Helper function to generate reliable YouTube thumbnail URL
const getThumbnailUrl = (video: CuratedVideo): string => {
    const videoId = getYouTubeVideoId(video.videoUrl);
    if (videoId) {
        const youtubeUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        // Use CORS proxy to avoid loading issues
        return `https://images.weserv.nl/?url=${encodeURIComponent(youtubeUrl)}`;
    }
    return video.imageUrl;
};

function PuraLibras() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Usar o hook para filtrar vídeos ou mostrar todos se nenhuma tag estiver selecionada
    const filteredVideos = useVideosByTags(selectedTags);
    
    // Se nenhuma tag estiver selecionada, mostrar todos os vídeos
    const videosToDisplay = selectedTags.length === 0 ? allVideos : filteredVideos;

    // Função para alternar a seleção de uma tag
    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    // Formatar duração em minutos
    const formatDuration = (minutes: number) => {
        return `${minutes} min`;
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {/* Seção de Filtros */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-[#292524] mb-4">Filtrar por Tags:</h2>
                <div className="flex flex-wrap gap-3">
                    {AVAILABLE_TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`
                                px-6 py-3 rounded-full font-semibold text-sm
                                transition-all duration-300 ease-in-out
                                border-2
                                ${selectedTags.includes(tag)
                                    ? 'bg-[#0d9488] text-white border-[#0d9488] shadow-md'
                                    : 'bg-white text-[#0d9488] border-[#0d9488] hover:bg-[#f0fdfa]'
                                }
                            `}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contador de Resultados */}
            <div className="mb-6">
                <p className="text-[#6b7280] text-base">
                    Mostrando <span className="font-bold text-[#0d9488]">{videosToDisplay.length}</span> vídeo{videosToDisplay.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Grid de Vídeos */}
            {videosToDisplay.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {videosToDisplay.map((video, index) => (
                        <a
                            key={index}
                            href={video.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white border border-[rgba(156,163,175,0.3)] rounded-2xl overflow-hidden no-underline text-inherit transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#0d9488] hover:shadow-lg"
                        >
                            {/* Thumbnail com overlay */}
                            <div className="relative overflow-hidden w-full h-48 bg-[#f0fdfa]">
                                <img
                                    src={getThumbnailUrl(video)}
                                    alt={video.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 relative z-0"
                                />
                                {/* Badge de Duração */}
                                <div className="absolute top-3 right-3 bg-[#f59e0b] text-white text-xs font-bold py-1 px-3 rounded-full shadow-md z-20">
                                    {formatDuration(video.duration)}
                                </div>
                                {/* Ícone de Play no hover */}
                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center z-10">
                                    <div className="w-16 h-16 rounded-full bg-[#0d9488] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Conteúdo do Card */}
                            <div className="p-5">
                                {/* Título */}
                                <h3 className="font-bold text-lg text-[#292524] mb-3 line-clamp-2 group-hover:text-[#0d9488] transition-colors duration-300">
                                    {video.title}
                                </h3>

                                {/* Badge da Plataforma */}
                                <div className="mb-3">
                                    <span className="inline-block bg-[#f0fdfa] text-[#0d9488] text-xs font-semibold py-1 px-3 rounded-full">
                                        {video.app}
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {video.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="inline-block bg-[#0d9488] text-white text-xs py-1 px-2 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                // Estado Vazio
                <div className="bg-white border border-[rgba(156,163,175,0.3)] rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🎥</div>
                    <h3 className="text-xl font-bold text-[#292524] mb-2">
                        Nenhum vídeo encontrado
                    </h3>
                    <p className="text-[#6b7280]">
                        Nenhum vídeo corresponde aos filtros selecionados. Tente selecionar outras tags!
                    </p>
                </div>
            )}
        </div>
    );
}

export default PuraLibras;
