import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <header className="bg-[#ffffff] shadow-[0_2px_4px_rgba(0,0,0,0.02)] p-5 flex justify-center border-b border-[rgba(156,163,175,0.2)]">
                <Link to="/" className="text-decoration-none">
                    <div className="text-3xl font-extrabold text-[#0d9488] tracking-[-0.5px] flex items-center gap-2">
                        <span>🤟</span> Sinalize!
                    </div>
                </Link>
            </header>
        </>
    );
}

export default Header;