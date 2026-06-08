import type { ReactNode } from 'react';
import './App.css'
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';

interface LayoutProps {
  children: ReactNode;

}

function App({ children }: LayoutProps) {


  return (
    <>
      {/* 
      Paleta de Cores - Sinalize!

      #fafaf9;
      Off-white (Fundo da página)

      #ffffff;
      Branco (Cards)

      #292524;
      Cinza Quase Preto (Texto Principal)

      #6b7280;
      Cinza Neutro (Labels e descrições)

      #9ca3af; 
      Cinza Neutro (Bordas)

      #0d9488;
      Teal Principal (Interações e Identidade)

      #0f766e;
      Teal Escuro (Hover e Títulos)

      #f0fdfa;
      Teal Claro (Backgrounds suaves)

      #f59e0b;
      Amber (Acentos e badges)
      */}
      <Header />
      {children} {/* The PageContent already contains the h1 and the main content */}
      <Footer />
    </>
  )
}

export default App
