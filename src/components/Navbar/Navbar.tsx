import { useLocation } from "react-router-dom";

import Button from "../Button";
import NavLink from "./NavLink";
import { useContext } from "react";
import { ServicesContext } from "../../contexts";
import { useAuthStore } from "../../store/authStore";

export default function Navbar() {
    const currentPath = useLocation().pathname;
    const service = useContext(ServicesContext).login;

    const user = useAuthStore((state) => state.user);
    const updateUser = useAuthStore((state) => state.updateUser);

    const goTo = (path: string) => {
        window.location.href = path;
    }

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
                    <Button label="Register or Login" onClick={() => goTo('/login')} />
                </div>
            ) : (
                <div>
                    <Button label={`Logout (${user!.name.split(' ')[0]})`} onClick={handleLogout} />
                    {/* <img src={authContext.user!.profilePictureUrl} alt="" /> */}
                </div>
            )
        }
    </nav>
}