import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

// Load all markdown files using Vite's import.meta.glob
// The '?raw' query parameter imports the file content as a string
const markdownFiles = import.meta.glob('/src/articles/articles-md/*.md', {
  query: '?raw',
  eager: true
});

function ReadArticle() {
  const [searchParams] = useSearchParams();

  const articleName = decodeURIComponent(searchParams.get('name') || '');

  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle cases where the URL doesn't have the search param yet
    if (!articleName) {
      setMarkdown('# Selecione um arquivo para ler \nVeja a lista de arquivos 👉 [aqui](https://sinalize.org/articles-list "📄✍️ Lista de Artigos")');
      setLoading(false);
      return;
    }

    const loadMarkdownData = () => {
      try {
        setLoading(true);
        setError(null);

        // Auto-append .md extension if the parameter omits it
        const cleanFilename = articleName.endsWith('.md') ? articleName : `${articleName}.md`;

        // Find the matching markdown file from the imported modules
        const matchedFile = Object.entries(markdownFiles).find(([path]) => {
          const filename = path.split('/').pop(); // Extract filename from path
          return filename === cleanFilename;
        });

        if (matchedFile) {
          // The imported content is in the format { default: "content" }
          const content = (matchedFile[1] as { default: string }).default;
          setMarkdown(content);
        } else {
          throw new Error(`File "${cleanFilename}" not found.`);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownData();
  }, [articleName]); // Hook triggers instantly when the search parameter changes

  if (loading) return <p>Loading document...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <>
      {/* Depois adicionar a opção o vídeo de Libras */}

      <article className="prose prose-lg prose-slate max-w-none px-8 py-8 mx-auto">
        {/* 3. Render raw Markdown text to structured semantic elements */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </article>

    </>
  );
}

export default ReadArticle