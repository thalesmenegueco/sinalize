import '../index.css'
import PageContent from '../PageContent.tsx'
import Dictionary from '../dictionary/Dictionary.tsx'
import VideoExplainer from '../shared/video-explainer/VideoExplainer.tsx'

function DictionaryPage() {
  return (
    <>
      <PageContent
        pageTitle="Dicionário de Sinais"
        description="Dicionário Português-Libras para consulta rápida"
        imgUrl="../src/assets/img-dict.png">
        <VideoExplainer
          videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/flashcard-page_COMO_USAR.mp4"
          title="Como Funciona esta Página?"
          triggerText="🤌❓ Como usar? "
        />
        <Dictionary /> {/* Aqui é onde o conteúdo principal será renderizado */}
      </PageContent>
    </>
  )
}

export default DictionaryPage