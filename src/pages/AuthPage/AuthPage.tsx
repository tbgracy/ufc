import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthProvider } from "../../types/authProvider";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from 'react-router-dom'
import { login } from "./authSlice";

export default function LoginPage() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.auth.status)
    const canLogin = status === 'loggedOut'
    const navigate = useNavigate()

    function handleLogin(provider: AuthProvider) {
        dispatch(login(provider))
        navigate('/')   
    }

    return <main>
        <section>
            <h2>Login</h2>
            <button disabled={!canLogin} onClick={() => handleLogin('github')}>
                <FaGithub /> with Github
            </button>
            <button disabled={!canLogin} onClick={() => handleLogin('google')}>
                <FaGoogle /> with Google
            </button>
        </section>
    </main>
} 