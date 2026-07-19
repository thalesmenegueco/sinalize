import NavCard from "@/shared/nav-card/NavCard"

const articleDict: Record<string, string> = {
    "Estratégias para Aprender Libras": "📚"
}

const articles = Object.entries(articleDict).map(([key, value]) => {
    return (

        <NavCard
            badgeText="em português"
            title={key}
            description="Clique para ler o artigo completo"
            icon={value}
            link={`/article?name=${encodeURIComponent(key)}`}
        ></NavCard>

    )
});


function ArticleList() {

    // Dicionário de Artigos
    // a chave (key) é o "Título do Artigo" e o nome ao arquivo .md
    // o valor (value) é o endereço da imagem thumbnail do Artigo

    return (
        <>
            {articles}
        </>
    )
}

export default ArticleList