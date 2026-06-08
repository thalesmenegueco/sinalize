// hooks/useClassModule.ts
import { useMemo } from 'react';
// O Vite importa arquivos JSON diretamente como objetos/arrays JavaScript.
import modulesData from '../../public/assets/modules.json'; 
import type { ClassModule } from '../types/module.ts';

// Fazemos um type assertion para garantir que o TypeScript valide o JSON contra nossa interface.
const typedModules = modulesData as ClassModule[];

/**
 * Hook para buscar os metadados de um módulo pelo ID.
 * @param moduleId O número inteiro referente ao ID do módulo.
 * @returns Os dados do módulo ou undefined se não for encontrado.
 */
export function useModuleById(moduleId: number): ClassModule | undefined {
  
  // O useMemo é crucial aqui para performance. Ele garante que o array 
  // só seja percorrido novamente se o "moduleId" mudar, evitando 
  // reprocessamento a cada re-renderização do componente.
  const moduleInfo = useMemo(() => {
    // Validação de segurança simples
    if (!Number.isInteger(moduleId) || moduleId <= 0) {
      return undefined; 
    }

    // Retorna o objeto que bater com o ID procurado
    return typedModules.find((mod) => mod.id === moduleId);
  }, [moduleId]);

  return moduleInfo;
}