import NavCard from "../shared/nav-card/NavCard";
import { Link } from 'react-router-dom'


function Home() {


  return (
    <>
        <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 w-full max-w-200 mt-8">
            <Link to="/courses">
            <NavCard
                title="Cursos"
                description="Aprenda naturalmente como numa conversa."
                icon="🎴"
                badgeText="Prática"
            />
            </Link>

            <Link to="/dictionary">
                <NavCard
                    title="Dicionário"
                    description="Busque uma palavra em português e veja a tradução em sinais."
                    icon="🔍"
                    badgeText="VLibras + INES"
                />
            </Link>

            <Link to="/articles-list">
                <NavCard
                    title="Artigos"
                    description="Aprenda mais sobre a teoria e a realidade atual da Libras."
                    icon="📄"
                    badgeText="Teoria"
                />
            </Link>

            <NavCard
                title="Pura Libras"
                description="Conteúdo escolhido a dedo totalmente em Libras (com tradução)."
                icon="❓"
                badgeText="Em Breve"
            />
        </section>
    
    </>
  )
}

export default Home