export default class GithubAPIService {
    static baseUrl = 'https://api.github.com';

    static async getToken(code: string) {
        const url = "https://ufc-github-auth.onrender.com/token?code=" + code;

        try {
            const response = await fetch(url);
            const res = await response.json();
            return res.get('token');
        } catch (e) {
            console.log(e);
        }
    }

    static async getUserInfo(token: string) {
        try {
            const result = await fetch(`${this.baseUrl}/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github+json',
                }
            });
            const parsedResponse = await result.json();
            return parsedResponse;
        }
        catch (e) {
            console.log(e);
        }
    }
}