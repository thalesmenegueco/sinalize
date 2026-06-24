import { useSearchParams } from 'react-router-dom';
import { useModuleById } from '../hooks/useClassModule';
import { useFlashcardsByIds } from '../hooks/useFlashcards';
import Flashcard from '../shared/flashcard/Flashcard';
import type { ClassModule } from '../types/module'

interface searchInfo {
    moduleId: number;
    videoId: number;
}

function ClassStudy() {
    const [searchParams] = useSearchParams();

    // Obtém os valores usando a chave exata - classes?moduleId=1&videoId=101
    const moduleId = Number(searchParams.get('moduleId'));
    const videoId = Number(searchParams.get('videoId'));

    {/*"https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/classes_videos/" + courseClass.videoId + ".mp4"
        target="_blank"
        rel="noopener
        noreferrer"
    */}

    // Chamada limpa e encapsulada
    const moduleData = useModuleById(moduleId);
    

    const classesArray = moduleData?.classes ?? [];
    const classInfo = classesArray.find(item => item.videoId === videoId);
    const videoSrc = `https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/classes_videos/${videoId}.mp4`;

    // Busca os flashcards associados a esta aula
    const flashcardIds = classInfo?.flashcardId ?? [];
    const flashcardData = useFlashcardsByIds(flashcardIds);

    return (
        <>
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

            {/* Flashcards Component */}
            {flashcardData && flashcardData.length > 0 && (
                <Flashcard flashcards={flashcardData} />
            )}
        </>
    )
}

export default ClassStudy
