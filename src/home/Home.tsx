import NavCard from "../shared/nav-card/NavCard";


function Home() {


    return (
        <>
            <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 w-full max-w-200 mt-8">

                <NavCard
                    title="Cursos"
                    description="Aprenda naturalmente como numa conversa."
                    icon="🎴"
                    badgeText="Prática"
                    link="/courses"
                />

                <NavCard
                    title="Dicionário"
                    description="Busque uma palavra em português e veja a tradução em sinais."
                    icon="🔍"
                    badgeText="VLibras + INES"
                    link="/dictionary"
                />

                <NavCard
                    title="Artigos"
                    description="Aprenda mais sobre a teoria e a realidade atual da Libras."
                    icon="📄"
                    badgeText="Teoria"
                    link="/articles-list"
                />

                <NavCard
                    title="Pura Libras"
                    description="Conteúdo escolhido a dedo totalmente em Libras."
                    icon="📺"
                    badgeText="Vídeos em Libras"
                    link="/puralibras"
                />
            </section>

        </>
    )
}

export default Home