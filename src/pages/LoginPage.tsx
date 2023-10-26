import { FaGithub, FaFacebook } from "react-icons/fa";
import { useContext } from "react";
import { ServicesContext } from "../contexts";

export default function LoginPage() {
    const service = useContext(ServicesContext).login;

    function handleChallengerLogin() {
        service.loginAs('challenger');
    }

    function handleChallengerRegister() {

    }

    function handleVoterLogin() {
        service.loginAs('voter')
    }

    function handleVoterRegister() { }

    return <main>
        <p>You can either login/register as a challenger or a code.</p>
        <section>
            <h2>Login</h2>
            <section>
                <button onClick={handleChallengerLogin}>
                    <FaGithub /> Login as challenger
                </button>
            </section>
            <section>
                <button onClick={handleVoterLogin}>
                    <FaFacebook /> Login as a voter
                </button>
            </section>
        </section>
        <section>
            <h2>Register</h2>
            <section>
                <button onClick={handleChallengerRegister}>
                    <FaGithub /> Register as a challenger
                </button>
            </section>
            <section>
                <button onClick={handleVoterRegister}>
                    <FaFacebook /> Register as a voter
                </button>
            </section>
        </section>
    </main>
} 