import '../index.css'
import PageContent from '../PageContent.tsx'
import Home from '../home/Home.tsx'
import VideoExplainer from '../shared/video-explainer/VideoExplainer.tsx'

function HomePage() {
    return (
        <>
            {/* WARNING: em `imgUrl` o caminho do arquivo vai ser a partir do documento html relacionado */}
            <PageContent
                pageTitle="Aprenda Libras na Prática"
                description="Sua plataforma minimalista e interativa para aprender a sinalizar e treinar sua comunicação em Libras"
                imgUrl="../assets/img-home.png">
                <VideoExplainer
                    videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/flashcard-page_COMO_USAR.mp4"
                    title="Como Funciona esta Página?"
                    triggerText="🤔❓ O que é isso? "
                />
                <Home /> {/* Aqui é onde o conteúdo principal será renderizado */}
            </PageContent>
        </>
    )
}

export default HomePage
