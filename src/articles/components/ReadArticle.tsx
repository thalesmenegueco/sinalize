import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '../../shared/header/Header'
import Footer from '../../shared/footer/Footer'

// Load all markdown files using Vite's import.meta.glob
// The '?raw' query parameter imports the file content as a string
const markdownFiles = import.meta.glob('/src/articles/articles-md/*.md', {
  query: '?raw',
  eager: true
});

// Resolve o conteúdo do artigo a partir do nome vindo da URL.
// A leitura é síncrona (import eager), então o resultado pode ser derivado
// diretamente com useMemo em vez de ser sincronizado via useEffect.
function resolveArticle(articleName: string): { markdown: string; error: string | null } {
  // Handle cases where the URL doesn't have the search param yet
  if (!articleName) {
    return {
      markdown: '# Selecione um arquivo para ler \nVeja a lista de arquivos 👉 [aqui](https://sinalize.org/articles-list "📄✍️ Lista de Artigos")',
      error: null,
    };
  }

  // Auto-append .md extension if the parameter omits it
  const cleanFilename = articleName.endsWith('.md') ? articleName : `${articleName}.md`;

  // Find the matching markdown file from the imported modules
  const matchedFile = Object.entries(markdownFiles).find(([path]) => {
    const filename = path.split('/').pop(); // Extract filename from path
    return filename === cleanFilename;
  });

  if (!matchedFile) {
    return { markdown: '', error: `File "${cleanFilename}" not found.` };
  }

  // The imported content is in the format { default: "content" }
  return { markdown: (matchedFile[1] as { default: string }).default, error: null };
}

function ReadArticle() {
  const [searchParams] = useSearchParams();

  const articleName = decodeURIComponent(searchParams.get('name') || '');

  const { markdown, error } = useMemo(() => resolveArticle(articleName), [articleName]);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <>
      <Header />
      {/* Depois adicionar a opção o vídeo de Libras */}

      <article className="w-[90vw] prose prose-lg prose-slate max-w-none px-8 py-8 mx-auto">
        {/* 3. Render raw Markdown text to structured semantic elements */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </article>
      <Footer />
    </>
  );
}

export default ReadArticle
