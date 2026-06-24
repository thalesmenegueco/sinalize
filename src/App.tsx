import './App.css'
import { Routes, Route } from 'react-router-dom';

// Importando as páginas
import HomePage from './pages/home-page.tsx'
import DictionaryPage from './pages/dictionary-page.tsx'
import CoursesPage from './pages/courses-page.tsx'
import ClassPage from './pages/class-page.tsx';


function App() {
  return (
    <>
      {/* 
      Paleta de Cores - Sinalize!

      #fafaf9|Off-white (Fundo da página)
      #ffffff|Branco (Cards)
      #292524|Cinza Quase Preto (Texto Principal)
      #6b7280|Cinza Neutro (Labels e descrições)
      #9ca3af|Cinza Neutro (Bordas)
      #0d9488|Teal Principal (Interações e Identidade)
      #0f766e|Teal Escuro (Hover e Títulos)
      #f0fdfa|Teal Claro (Backgrounds suaves)
      #f59e0b|Amber (Acentos e badges)
      */}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/classes" element={<ClassPage />} />
          {/* Rota de Fallback para exibir um "404 Customizado" no frontend */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </main>

      {/*
      <Header />
      {children}
      <Footer />
      */}
    </>
  )
}

export default App
