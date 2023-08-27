import { useLocation } from "react-router-dom";

import Button from "../Button";
import NavLink from "./NavLink";

export default function Navbar() {
    const currentPath = useLocation().pathname;
    const goTo = (path: string) => {
        window.location.href = path;
    }

    return <nav>
        <h1 className="logo">UFC</h1>
        <ul className="navlinks">
            <NavLink target="/" label="Home" isCurrent={currentPath === '/'} />
            <NavLink target="/ranking" label="Ranking" isCurrent={currentPath === '/ranking'} />
            <NavLink target="/rules" label="Rules" isCurrent={currentPath === '/rules'} />
        </ul>
        <div className="action">
            <Button label="Register" onClick={() => goTo('/login')} />
        </div>
    </nav>
}