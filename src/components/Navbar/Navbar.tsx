import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { logout } from '../../pages/AuthPage/authSlice'

import NavLink from "./NavLink";
import UserAvatar from "../UserAvatar";

export default function Navbar() {
    const currentPath = useLocation().pathname;
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.user)

    function handleLogout() {
        dispatch(logout());
    }

    return <nav>
        <Link to="/">
            <h1 className="logo">UFC</h1>
        </Link>
        <ul className="navlinks">
            <NavLink target="/" label="Home" isCurrent={currentPath === '/'} />
            <NavLink target="/ranking" label="Ranking" isCurrent={currentPath === '/ranking'} />
            <NavLink target="/rules" label="Rules" isCurrent={currentPath === '/rules'} />
        </ul>
        {user == undefined
            ? (
                <div className="action">
                    <Link to='/login'> Register or login </Link>
                </div>
            ) : (
                <UserAvatar user={user} onLogout={handleLogout} />
            )}
    </nav>;
}
