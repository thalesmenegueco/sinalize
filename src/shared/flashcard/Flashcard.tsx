import { useState } from 'react';
import type { Flashcard as FlashcardType } from '../../types/module';

interface FlashcardProps {
  flashcards: FlashcardType[];
}

type Mode = 'libras' | 'pt';

function Flashcard({ flashcards }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('libras');
  const [isFlipped, setIsFlipped] = useState(false);

  // Se não houver flashcards, não renderiza nada
  if (!flashcards || flashcards.length === 0) {
    return null;
  }

  const currentCard = flashcards[currentIndex];
  const videoSrc = `https://pub-53c058da4b9543a8b580f5adffb6a867.r2.dev/flashcard-page/${currentCard.flashcardUrl}`;

  // Função para virar o card
  const toggleFlip = (event: React.MouseEvent) => {
    // Previne flip se clicar no vídeo
    if ((event.target as HTMLElement).closest('.video-container')) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  // Função para resetar o estado de flip
  const resetFlipState = () => {
    setIsFlipped(false);
  };

  // Função para mudar o modo
  const handleModeChange = (newMode: Mode) => {
    if (mode === newMode) return;
    
    setMode(newMode);
    
    // Se estiver virado, desvira antes de re-renderizar
    if (isFlipped) {
      resetFlipState();
    }
  };

  // Navegação
  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (isFlipped) {
        resetFlipState();
      }
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (isFlipped) {
        resetFlipState();
      }
    }
  };

  // Componentes de conteúdo
  const videoHTML = (
    <div className="video-container w-full h-full max-h-87.5 rounded-lg overflow-hidden bg-stone-800 relative z-10">
      <video
        src={videoSrc}
        controls
        className="w-full h-full"
        title="Vídeo em Libras"
      >
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );

  const textHTML = (
    <div className="text-4xl text-teal-dark font-bold text-center">
      {currentCard.portugueseText}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-teal-dark text-3xl font-bold mb-6">Pratique! 👇</h2>

      {/* Toggle de Modos */}
      <div className="flex flex-col items-center gap-4 mb-8 w-full max-w-150">
        <div 
          className="flex items-center bg-white p-2 rounded-full shadow-sm border border-gray-400"
          role="radiogroup" 
          aria-label="Modo de Estudo"
        >
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              mode === 'libras'
                ? 'bg-teal-main shadow-md'
                : 'bg-transparent text-gray-600'
            }`}
            style={mode === 'libras' ? { color: 'var(--teal-main)' } : undefined}
            onClick={() => handleModeChange('libras')}
          >
            Libras na Frente
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              mode === 'pt'
                ? 'bg-teal-main shadow-md'
                : 'bg-transparent text-gray-600'
            }`}
            style={mode === 'pt' ? { color: 'var(--teal-main)' } : undefined}
            onClick={() => handleModeChange('pt')}
          >
            Português na Frente
          </button>
        </div>
      </div>

      {/* Flashcard 3D */}
      <div 
        className="w-full max-w-150 h-125 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={toggleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-600 shadow-lg rounded-2xl ${
            isFlipped ? 'transform:[rotateY(180deg)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Face Frontal */}
          <div
            className="absolute w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-gray-100"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Tags */}
            <div className="absolute top-4 left-4 flex gap-2">
              {currentCard.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-light text-teal-dark px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Conteúdo baseado no modo */}
            <div className="grow flex items-center justify-center w-full">
              {mode === 'libras' ? videoHTML : textHTML}
            </div>

            {/* Prompt */}
            <div className="mt-6 text-lg text-gray-600 font-medium">
              {mode === 'libras' 
                ? '🤔💭 Pare e Pense: como seria em português?' 
                : '🤔💭 Pare e Pense: como seria em Libras?'}
            </div>

            {/* Botão de Resposta */}
            <button className="mt-4 bg-amber-accent text-white px-8 py-2 rounded-full text-base shadow-md bg-amber-600 hover:font-bold transition-colors">
              Clique para ver a Resposta
            </button>
          </div>

          {/* Face Traseira */}
          <div
            className="absolute w-full h-full bg-teal-light rounded-2xl flex flex-col items-center justify-center p-8 text-center border border-gray-100"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="mb-4 text-base text-gray-500">
              Seria algo parecido com isso:
            </div>
            <div className="grow flex items-center justify-center w-full">
              {mode === 'libras' ? textHTML : videoHTML}
            </div>
          </div>
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-150">
        <div className="flex justify-between items-center w-full">
          <button
            className="bg-white text-teal-main border-2 border-teal-main px-6 py-3 rounded-lg font-bold hover:bg-teal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={prevCard}
            disabled={currentIndex === 0}
          >
            Anterior
          </button>
          <span className="text-gray-600 font-medium">
            {currentIndex + 1} / {flashcards.length}
          </span>
          <button
            className="bg-white text-teal-main border-2 border-teal-main px-6 py-3 rounded-lg font-bold hover:bg-teal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextCard}
            disabled={currentIndex === flashcards.length - 1}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
