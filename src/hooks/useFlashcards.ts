// hooks/useFlashcards.ts
import { useMemo } from 'react';
import flashcardsData from '../assets/flashcards.json';
import type { Flashcard } from '../types/module';

// Type assertion to ensure TypeScript validates the JSON against our interface
const typedFlashcards = flashcardsData as Flashcard[];

/**
 * Hook para buscar flashcards pelos IDs fornecidos.
 * @param flashcardIds Array de IDs de flashcards a serem buscados.
 * @returns Array de flashcards correspondentes aos IDs fornecidos.
 */
export function useFlashcardsByIds(flashcardIds: number[]): Flashcard[] {
  
  // useMemo garante que o filtro só seja executado novamente se flashcardIds mudar
  const flashcards = useMemo(() => {
    // Validação de segurança
    if (!Array.isArray(flashcardIds) || flashcardIds.length === 0) {
      return [];
    }

    // Filtra os flashcards que correspondem aos IDs fornecidos
    return typedFlashcards.filter((flashcard) => 
      flashcardIds.includes(flashcard.flashcardId)
    );
  }, [flashcardIds]);

  return flashcards;
}
