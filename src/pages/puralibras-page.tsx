import '../index.css'
import PageContent from '../PageContent.tsx'
// import VideoExplainer from '../shared/video-explainer/VideoExplainer.tsx'
import pageIcon from '../assets/img-video-library.png'
// import ReactMarkdown from 'react-markdown';
import PuraLibras from '../pura-libras/PuraLibras.tsx'

function PuraLibrasPage() {
    return (
        <>
            {/* WARNING: em `imgUrl` o caminho do arquivo vai ser a partir do documento html relacionado */}
            <PageContent
                pageTitle="Pura Libras"
                description="Biblioteca de vídeos curados em Libras"
                imgUrl={pageIcon}>
                
                {/*<VideoExplainer
                    videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/sinalize_COMO_USAR.mp4"
                    title="Como Funciona esta Página?"
                    triggerText="🤔❓ O que é isso? "
                />*/}

                <PuraLibras /> {/* Aqui é onde o conteúdo principal será renderizado */}
            </PageContent>
        </>
    )
}

export default PuraLibrasPage
