// components/ModuleDetails.tsx
import React from 'react';
import { useModuleById } from '../../hooks/useClassModule';

interface ModuleDetailsProps {
  moduleId: number;
}

export const ModuleDetails: React.FC<ModuleDetailsProps> = ({ moduleId }) => {
  // Chamada limpa e encapsulada
  const moduleData = useModuleById(moduleId);

  // UX: Fallback visual amigável caso o ID passado não exista no JSON
  if (!moduleData) {
    return (
      <div className="error-state">
        <h2>Módulo não encontrado</h2>
        <p>Infelizmente, não conseguimos carregar as informações desta aula.</p>
      </div>
    );
  }

  // Renderização feliz (Happy Path)
  return (
    <article className="module-card">
      <header>
        <h1>{moduleData.title}</h1>
        <span className="duration-badge">🕒 {moduleData.durationInMinutes} min</span>
      </header>
      
      <p>{moduleData.description}</p>
      <video 
      className="w-120 h-auto m-2"
      controls>
        <source src={moduleData.videoUrl} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
  
      <ol>
      {/* O método .map() substitui o laço for */}
      {moduleData.classes.map((courseClass) => (
        <li key={courseClass.videoName}>
          <a href={"https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/classes_videos/" + courseClass.videoId + ".mp4"}
          target="_blank"
          rel="noopener
          noreferrer">
            {courseClass.videoName}
          </a>
        </li>
      ))}
    </ol>
    </article>
  );
};