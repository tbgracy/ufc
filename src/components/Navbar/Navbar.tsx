import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { login, logout } from './authSlice'

import NavLink from "./NavLink";
import UserAvatar from "../UserAvatar";
import { FaGithub } from "react-icons/fa";
import { AuthProvider } from "../../types/authProvider";

export default function Navbar() {
    const currentPath = useLocation().pathname;
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user)
    const loginStatus = useAppSelector(state => state.auth.status)
    const navigate = useNavigate()
    
    const canLogin = loginStatus === 'loggedOut'

    function handleLogin(provider: AuthProvider) {
        dispatch(login(provider)).then(() => {
            navigate('/')
        })
    }

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
                <button className="action" disabled={!canLogin} onClick={() => handleLogin('github')}>
                    {loginStatus === 'loading' ? "Login in ... " : (<><FaGithub /><p className="login-text">Login with Github</p> </>)}
                </button>
            ) : (
                <UserAvatar user={user} onLogout={handleLogout} />
            )
        }
    </nav >;
}
