// Aqui que eu vou extrair os search Params
// Aqui também que irei colocar o ClassStudy como children

import PageContent from '../PageContent.tsx'
import ClassStudy from '../class-study/ClassStudy.tsx'
import VideoExplainer from '../shared/video-explainer/VideoExplainer.tsx'
import pageIcon from '../assets/img-home.png'

function ClassPage() {
    return (
        <>
            {/* WARNING: em `imgUrl` o caminho do arquivo vai ser a partir do documento html relacionado */}
            <PageContent
                pageTitle="Aula + Atividade"
                description="Vídeo aula curtinha e atividade interativa (Flashcards)"
                imgUrl={pageIcon}>
                <VideoExplainer
                    videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/sinalize_COMO_USAR.mp4"
                    title="Como Funciona esta Página?"
                    triggerText="🤔❓ O que é isso? "
                />
                <VideoExplainer
                    videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/flashcard-page_COMO_USAR.mp4"
                    title="Como Funciona esta Página?"
                    triggerText="🎴🤌❓ Como usar Flashcards"
                />
                <ClassStudy /> {/* Aqui é onde o conteúdo principal será renderizado */}
            </PageContent>
        </>
    )
}

export default ClassPage
