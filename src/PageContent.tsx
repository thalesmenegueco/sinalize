import type { ReactNode } from 'react';

interface PageContentProps {
    pageTitle: string;
    description?: string;
    imgUrl: string;
    children: ReactNode;
}

function PageContent({pageTitle, description,  imgUrl, children }: PageContentProps) {
    return (
        <>
            <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
                <section className="text-center text-[2.5rem] text-[#0f766e] max-w-150 mb-8">
                    <h1 className="flex items-center flex-col mb-4">
                        
                        <img src={imgUrl} alt="ícone da página" />
                        <span>{pageTitle}</span>
                    </h1>
                    <p className="text-lg text-[#6b7280] leading-relaxed">{description}</p>
                </section>

                {children} {/* Aqui é onde o componente de cada página será renderizado */}
            </main>
        </>
    );
}

export default PageContent;