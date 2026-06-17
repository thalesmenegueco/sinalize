import { useSearchParams } from 'react-router-dom';
import { useModuleById } from '../hooks/useClassModule';
import type { ClassModule } from '../types/module'

interface searchInfo {
    moduleId: number;
    videoId: number;
}

function ClassStudy(moduleId: number, videoId: number, moduleData: ClassModule | undefined) {
    const [searchParams] = useSearchParams();

    // Obtém os valores usando a chave exata
    moduleId = Number(searchParams.get('moduleId'));
    videoId = Number(searchParams.get('videoId'));

    {/*"https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/classes_videos/" + courseClass.videoId + ".mp4"
        target="_blank"
        rel="noopener
        noreferrer"
    */}

    // Chamada limpa e encapsulada
    moduleData = useModuleById(moduleId);
    

    const classesArray = moduleData?.classes ?? [];
    const classInfo = classesArray.find(item => item.videoId === videoId);
    const videoSrc = `https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/classes_videos/${videoId}.mp4`;

    return (
        <div className="video-wrapper">
            <video
                src={videoSrc}
                title={classInfo?.videoName ?? "Vídeo sem título"}
                controls // Adiciona play, pause, volume, tela cheia nativos
                autoPlay // Começa a tocar automaticamente ao abrir o modal
                playsInline // Evita que o vídeo abra em tela cheia automaticamente no iOS
                className="video-element"
            >
                Seu navegador não suporta a tag de vídeo.
            </video>
        </div>
    )
}

export default ClassStudy
