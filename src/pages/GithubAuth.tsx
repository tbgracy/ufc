export default function GithubAuth() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code')
    console.log(`CODE IS : ${code}`);
    return <></>
} 