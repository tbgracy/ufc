import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

import GithubAPIService from "../services/githubApi";


export default function GithubAuth() {
    // tokony alefa amin'service akagny leh url aveo agnay mitraite azy
    const { isLoading, error } = useQuery(['token'], () => {
        const searchParams = window.location.search;
        const code = searchParams.replace('?code', '');
        if (code !== null){
            return GithubAPIService.getToken(code);
        } else {
            throw Error('code not found');
        }
    });

    if (isLoading) return <ClipLoader color="white" />

    if (error) return 'An error has occured: '

    return <div>
        Yes
    </div>
} 