import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { ServicesContext } from "../contexts";


export default function GithubAuth() {
    const service = useContext(ServicesContext).challenger;

    const { isLoading, error, data } = useQuery(['token'], () => {
        const searchParams = window.location.search;
        const code = searchParams.replace('?code=', '');
        if (code !== null) {
            return service.register(code);
        } else {
            throw Error('code not found');
        }
    });

    if (isLoading) return <ClipLoader color="white" />

    if (error) return 'An error has occured'

    return <div>
        {data?.toString()}
    </div>
} 