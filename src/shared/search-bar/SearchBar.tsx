import { useState } from 'react';
import type { KeyboardEvent, PointerEvent, MouseEvent } from 'react';

interface SearchBarProps {
  onSearch: (word: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  // Centralizamos a lógica de busca para ser chamada por qualquer evento
  const executeSearch = () => {
    const word = inputValue.trim();
    if (!word) {
      setError(true);
      return;
    }
    setError(false);
    onSearch(word);
  };

  // 1. Resolve o problema do "Enter" no teclado
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Impede o comportamento padrão do form
      executeSearch();
    }
  };

  // 2. Resolve o clique no mobile/mouse antes do Bubbling (Pointer)
  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    executeSearch();
  };

  // 3. Força a execução na fase de Captura (Capture Phase) antes do VLibras
  const handleClickCapture = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Garante que o VLibras não roube o clique
    executeSearch();
  };

  return (
    <section className="w-full max-w-md bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 transition-all hover:shadow-md">
      {/* Removemos o onSubmit do form, pois controlaremos a submissão manualmente nos inputs/buttons */}
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-input" className="block text-sm font-medium text-[#6b7280] mb-2">
          Qual palavra você quer aprender a sinalizar?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="search-input"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError(false);
            }}
            onKeyDown={handleKeyDown} // Ouvinte direto para o Enter
            className={`grow border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-shadow text-[#292524] placeholder:text-gray-400 
              ${error ? 'border-[#f59e0b] ring-1 ring-[#f59e0b]' : 'border-[#9ca3af] focus:ring-[#0d9488]'}`}
            placeholder="Ex: Acessibilidade..."
            aria-label="Palavra a ser traduzida para Libras"
          />
          <button
            type="button" // Mudamos para button para não engatilhar o submit nativo acidentalmente
            onPointerDown={handlePointerDown}
            onClickCapture={handleClickCapture}
            className="bg-[#0d9488] hover:bg-tealHover text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d9488]"
          >
            🔍
          </button>
        </div>

        {error && (
          <p className="text-[#f59e0b] text-sm mt-2" aria-live="assertive">
            Por favor, digite uma palavra para continuar.
          </p>
        )}
      </form>
    </section>
  );
}