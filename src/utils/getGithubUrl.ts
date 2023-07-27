export function getGitHubUrl() {
    const rootURl = "https://github.com/login/oauth/authorize";
    console.log(import.meta.env);

    const options = {
        client_id: import.meta.env.VITE_GITHUB_CLIENT_ID as string,
    };

    const qs = new URLSearchParams(options);

    return `${rootURl}?${qs.toString()}`;
}