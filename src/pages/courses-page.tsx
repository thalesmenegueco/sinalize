import '../index.css'
import PageContent from '../PageContent.tsx'
import VideoExplainer from '../shared/video-explainer/VideoExplainer.tsx'
import NavCard from '../shared/nav-card/NavCard.tsx'
import { ModuleDetails } from '../shared/module-index/ModuleDetails.tsx'
import pageIcon from '../assets/img-courses.png'

function CoursesPage() {
  return (
    <>
      <PageContent
        pageTitle="Cursos de Libras"
        description="Cursos com ênfase em comunicação desde a primeira aula"
        imgUrl={pageIcon}>
        <VideoExplainer
          videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/courses-page_USAR_COMO.mp4"
          title="Como Funciona esta Página?"
          triggerText="⏯️🤌❓ Como são os cursos"
        />
        
        <NavCard
          title="Primeiros Sinais"
          description="Sua primeira conversa em Libras"
          icon="👋"
          badgeText="Básico 1">
          <ModuleDetails moduleId={1} />
        </NavCard>

      </PageContent>
    </>
  )
}

export default CoursesPage