// components/ModuleDetails.tsx
import React from 'react';
import { useModuleById } from '../../hooks/useClassModule';
// import { useNavigate } from 'react-router-dom';

interface ModuleDetailsProps {
  moduleId: number;
}

/*

type QueryClassParams = {
  moduleId: number;
  videoId: number;
}

*/

export const ModuleDetails: React.FC<ModuleDetailsProps> = ({ moduleId }) => {

  // Para acessar as aulas
  /*
  const navigate = useNavigate()

  const openPage = (localModuleId: number, localClassId: number) => {
    // Define os parâmetros que você quer enviar
    const meusParametros: QueryClassParams = {moduleId: localModuleId, videoId: localClassId}

    navigate({
      pathname: 'https://sinalize.org/classes',
      search: `?moduleId=${Number(meusParametros.moduleId)}&videoId=${Number(meusParametros.videoId)}`
    })
  }

  */

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

      <ol className='text-left list-decimal list-inside'>
        {/* O método .map() substitui o laço for */}
        {moduleData.classes.map((courseClass) => (
          <li key={courseClass.videoName}>
            👉 <a href={`https://sinalize.org/classes?moduleId=${String(moduleId)}&videoId=${String(courseClass.videoId)}`}>
              {courseClass.videoName}
            </a>
          </li>
        ))}
      </ol>

      {/*

      <ol className='text-left list-decimal list-inside'>
      {moduleData.classes.map((courseClass) => (
        <li key={courseClass.videoName}>
          👉 <a href={"https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/classes_videos/" + courseClass.videoId + ".mp4"}
          target="_blank"
          rel="noopener
          noreferrer">
            {courseClass.videoName}
          </a>
        </li>
      ))}
    </ol>

      */}

    </article>
  );
};