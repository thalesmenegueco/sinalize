import React, { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import './VideoExplainer.css'; // Importando os estilos (ver abaixo)

interface VideoExplainerProps {
  /** URL do vídeo (ex: link de embed do YouTube, Vimeo ou arquivo .mp4) */
  videoSrc: string;
  /** Título para acessibilidade e cabeçalho do modal */
  title?: string;
  /** Texto do botão que aciona o vídeo */
  triggerText?: string;
}

const VideoExplainer: React.FC<VideoExplainerProps> = ({
  videoSrc,
  title = 'Vídeo Explicativo',
  triggerText = 'Como funciona esta página?',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Trava o scroll da página quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Permite fechar o modal com a tecla 'Escape' (Boa prática de Acessibilidade)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Previne que o clique dentro do modal feche a janela (Event Bubbling)
  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* GATILHO - O botão que fica na página */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="video-trigger-btn"
        aria-label={`Abrir ${title}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
          <path d="M8 5v14l11-7z" />
        </svg>
        {triggerText}
      </button>

      {/* MODAL - Renderizado apenas quando isOpen for true */}
      {isOpen && (
        <div 
          className="video-modal-overlay" 
          onClick={() => setIsOpen(false)} // Fecha ao clicar fora
          role="dialog"
          aria-modal="true"
        >
          <div className="video-modal-content" onClick={handleModalClick}>
            
            <div className="video-modal-header">
              <h3 className="video-modal-title">{title}</h3>
              <button 
                className="video-close-btn" 
                onClick={() => setIsOpen(false)}
                aria-label="Fechar vídeo"
              >
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="video-wrapper">
              <video
                src={videoSrc}
                title={title}
                controls // Adiciona play, pause, volume, tela cheia nativos
                autoPlay // Começa a tocar automaticamente ao abrir o modal
                playsInline // Evita que o vídeo abra em tela cheia automaticamente no iOS
                className="video-element"
              >
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default VideoExplainer