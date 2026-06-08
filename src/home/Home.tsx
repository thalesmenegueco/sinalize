import NavCard from "../shared/nav-card/NavCard";



function Home() {


  return (
    <>
        <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 w-full max-w-200 mt-8">
            <NavCard
                title="Cursos"
                description="Aprenda naturalmente como numa conversa."
                icon="🎴"
                link="../../public/courses.html"
                badgeText="Prática"
            />

            <NavCard
                title="Dicionário"
                description="Busque uma palavra em português e veja a tradução em sinais."
                icon="🔍"
                link="../../public/dictionary.html"
                badgeText="VLibras + INES"
            />

            <NavCard
                title="Artigos"
                description="Aprenda mais sobre a teoria e a realidade atual da Libras."
                icon="❓"
                link="../../public/articles.html"
                badgeText="Em Breve"
            /> {/* link="../../articles.html" */}
        </section>
    
    </>
  )
}

export default Home