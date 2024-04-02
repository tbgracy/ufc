import { Link, useLocation } from "react-router-dom";
import NavLink from "./NavLink";
import { useContext } from "react";
import { ServicesContext } from "../../contexts";
import { useAuthStore } from "../../store/authStore";
import UserAvatar from "../UserAvatar";


export default function Navbar() {
    const currentPath = useLocation().pathname;
    const service = useContext(ServicesContext).login;

    const user = useAuthStore((state) => state.user);
    const updateUser = useAuthStore((state) => state.updateUser);

    function handleLogout() {
        service.logout().then(result => {
            console.log(result);
            if (result instanceof Error) {
                console.log(result);
            } else {
                updateUser();
            }
        });
    }

    return <nav>
        <h1 className="logo">UFC</h1>
        <ul className="navlinks">
            <NavLink target="/" label="Home" isCurrent={currentPath === '/'} />
            <NavLink target="/ranking" label="Ranking" isCurrent={currentPath === '/ranking'} />
            <NavLink target="/rules" label="Rules" isCurrent={currentPath === '/rules'} />
        </ul>
        {user == undefined
            ? (
                <div className="action">
                    <Link to='/login' > Register or login </Link>
                </div>
            ) : (
                <UserAvatar user={user} onLogout={handleLogout} />
            )}
    </nav>;
}
