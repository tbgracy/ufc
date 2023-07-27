import { FaGithub, FaFacebook } from "react-icons/fa";
import { getGitHubUrl } from "../utils/getGithubUrl";

export default function LoginPage() {
    function handleChallengerLogin() {
        window.location.href = getGitHubUrl();
    }

    return <main>
        <h2>Login</h2>
        <p>You can either connect as a challenger or a code.</p>
        <button onClick={handleChallengerLogin}>
            <FaGithub /> Login as challenger
        </button>
        <button disabled>
            <FaFacebook /> Login as a voter
        </button>
    </main>
} 