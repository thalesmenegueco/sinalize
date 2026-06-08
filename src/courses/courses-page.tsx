import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from '../App.tsx'
import PageContent from '../PageContent.tsx'
import VideoExplainer from '../shared/video-explainer/VideoExplainer.tsx'
import NavCard from '../shared/nav-card/NavCard.tsx'
import { ModuleDetails } from '../shared/module-index/ModuleDetails.tsx'

createRoot(document.getElementById('root')!).render(
    
  <StrictMode>
    <App>
      <PageContent
      pageTitle="Cursos de Libras"
      description="Cursos com ênfase em comunicação desde a primeira aula"
      imgUrl="src/assets/img-dict.png">
        <VideoExplainer 
          videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/flashcard-page_COMO_USAR.mp4"
          title="Como Funciona esta Página?"
          triggerText="⏯️🤌❓ Como são os cursos"
        />
        <VideoExplainer 
          videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/flashcard-page_COMO_USAR.mp4"
          title="Como Funciona esta Página?"
          triggerText="🎴🤌❓ Como usar Flashcards"
        />
        <NavCard
          title="Primeiros Sinais"
          description="Sua primeira conversa em Libras"
          icon="👋"
          badgeText="Básico 1">
            <ModuleDetails moduleId={1} />
        </NavCard>
          
      </PageContent>
    </App>
  </StrictMode>,
)
