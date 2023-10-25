export default function getGitHubUrl() {
    const rootURl = "https://github.com/login/oauth/authorize";

    const options = {
        client_id: import.meta.env.VITE_GITHUB_CLIENT_ID as string,
        redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI as string,
    };

    const qs = new URLSearchParams(options);

    return `${rootURl}?${qs.toString()}`;
}