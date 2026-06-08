import { useEffect, useRef } from 'react';

interface ActiveTranslationProps {
  word: string;
}

export function ActiveTranslation({ word }: ActiveTranslationProps) {
  const targetRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (word && targetRef.current) {
      const el = targetRef.current;
      
      const timer = setTimeout(() => {
        const selection = window.getSelection();
        selection?.removeAllRanges();

        const range = document.createRange();
        range.selectNodeContents(el);
        selection?.addRange(range);

        const syntheticEvent = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          view: window
        });

        el.dispatchEvent(syntheticEvent);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [word]);

  if (!word) return null;

  return (
    <section 
      className="w-full max-w-md bg-tealLight border-l-4 border-tealMain p-4 rounded-r-lg mb-8 animate-fade-in" 
      aria-live="polite"
    >
      <p className="text-sm text-tealMain font-semibold mb-1">Traduzindo agora:</p>
      <h2 
        ref={targetRef} 
        className="text-2xl font-bold text-textMain cursor-default vlibras-target-word"
      >
        {word}
      </h2>
      <p className="text-xs text-labelGray mt-2 flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Clique na palavra acima com o VLibras ativado para ver o sinal.
      </p>
    </section>
  );
}