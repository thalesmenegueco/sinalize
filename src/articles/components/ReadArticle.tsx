declare module '*.txt' {
  const content: string;
}

import ReactMarkdown from 'react-markdown';



// This is where the Markdown from the article file will be rendered
const markdownContent = `
# Hello World
This is a **Markdown** snippet being rendered in **React + Vite**!
* Item one
* Item two
`;

export function MyComponent() {
  return (
    <div className="prose"> 
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}