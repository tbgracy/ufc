import { FaGithub, FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { ServicesContext } from "../contexts";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
    const service = useContext(ServicesContext).login;
    const updateUser = useAuthStore((state) => state.updateUser);

    function handleLogin(provider: 'github' | 'google') {
        service.loginWith(provider).then(result => {
            console.log(result);
            const user = JSON.parse(localStorage.getItem('user')!);
            updateUser(user);
        });
    }

    function handleRegister(provider: 'github' | 'google') {
        console.log(provider);
    }

    return <main>
        <section>
            <h2>Login</h2>
            <button onClick={() => handleLogin('github')}>
                <FaGithub /> with Github
            </button>
            <button onClick={() => handleLogin('google')}>
                <FaGoogle /> with Google
            </button>
        </section>
        <section>
            <h2>Register</h2>
            <button onClick={() => handleRegister('github')}>
                <FaGithub /> with Github
            </button>
            <button onClick={() => handleRegister('google')}>
                <FaGoogle /> with Google
            </button>
        </section>
    </main>
} 