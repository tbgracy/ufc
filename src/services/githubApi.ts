export default class GithubAPIService {
    static async getToken(code: string) {
        const url = "https://ufc-github-auth.onrender.com/token?code=" + code;

        try {

            const response = await fetch(url);
            
            console.log(response);
            
            return response;
        } catch (e){
            console.log(e);
            
        }
    }
}