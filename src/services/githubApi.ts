import { Repository } from "../types/repository";

export default class GithubAPIService {
    static baseUrl = 'https://api.github.com';

    static async getToken(code: string) {
        const url = "https://ufc-github-auth.onrender.com/token?code=" + code;

        try {
            const response = await fetch(url);
            const { token } = await response.json();
            return token;
        } catch (e) {
            console.log(e);
        }
    }

    static async getUserInfo(token: string) {
        const headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }

        console.log(token);
        console.log(headers);

        try {
            const result = await fetch(`${this.baseUrl}/user`, {
                headers: headers,
            });
            const parsedResponse = await result.json();
            return parsedResponse;
        }
        catch (e) {
            console.log(e);
        }
    }

    static async getRepos(user: string): Promise<Repository[]> {
        const reqUrl = `${this.baseUrl}/users/${user}/repos?sort=created&per_page=100`;

        try {
            const response = await fetch(reqUrl);
            return response.json();
        } catch (e) {
            console.log(e);
            return [];
        }
    }
}
