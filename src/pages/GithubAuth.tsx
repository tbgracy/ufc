import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

import GithubAPIService from "../services/githubApi";


export default function GithubAuth() {
    const { isLoading, error } = useQuery(['token'], () => {
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code') ?? 'NO CODE FOUND';
        return GithubAPIService.getToken(code);
    });


    if (isLoading) return <ClipLoader />

    if (error) return 'An error has occured: '

    return <div>
        Yes
    </div>
} 