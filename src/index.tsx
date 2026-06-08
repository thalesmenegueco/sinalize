import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PageContent from './PageContent.tsx';
import Home from './home/Home.tsx';
import VideoExplainer from './shared/video-explainer/VideoExplainer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      {/* WARNING: em `imgUrl` o caminho do arquivo vai ser a partir do documento html relacionado */}
      <PageContent
        pageTitle="Aprenda Libras na Prática"
        description="Sua plataforma minimalista e interativa para aprender a sinalizar e treinar sua comunicação."
        imgUrl="../src/assets/img-home.png">
          <VideoExplainer 
          videoSrc="https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/how-to_videos/flashcard-page_COMO_USAR.mp4"
          title="Como Funciona esta Página?"
          triggerText="🤔❓ O que é isso? "
        /> 
        <Home /> {/* Aqui é onde o conteúdo principal será renderizado */}
      </PageContent>
    </App>
  </StrictMode>,
)
