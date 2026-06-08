import type { ReactNode } from 'react'

interface NavCardProps {
    title: string;
    description: string;
    icon: string; // Pode ser um emoji ou um caminho para um ícone SVG
    link?: string;
    badgeText?: string; // Texto opcional para o badge
    children?: ReactNode; // Permite adicionar conteúdo adicional dentro do card, se necessário
}

function NavCard({ title, description, icon, link, badgeText, children }: NavCardProps) {
    return (
        <>
            <a href={link ? link : '#'} className="group bg-white border border-[rgba(156,163,175,0.3)] rounded-2xl py-10 px-8 no-underline text-inherit flex flex-col items-center text-center relative transition-all duration-300 ease-in-out hover:-translate-y-1.25 hover:border-[#0d9488] mb-2 mt-2" aria-label={title}>
                <div className="absolute -top-3 bg-[#f59e0b] text-[#ffffff] text-xs font-bold py-1 px-3 rounded-full uppercase tracking-[0.5px] shadow-[0_2px_4px_rgba(245,158,11,0.3)]">{badgeText}</div>
                <div className="bg-[#f0fdfa] text-[#0d9488] w-20 h-20 rounded-full flex items-center justify-center text-[2.5rem] mb-6 transition-colors duration-300 ease-in-out  group-hover:bg-[#0d9488] group-hover:text-[#ffffff]">{icon}</div>
                <h2 className='font-bold text-2xl text-[#292524] mb-2'>{title}</h2>
                <p className='text-[#6b7280] text-base leading-normal'>{description}</p>
                <div className='hidden group-hover:block mt-3'>{children}</div>
            </a>
            
        </>
    )

}

export default NavCard