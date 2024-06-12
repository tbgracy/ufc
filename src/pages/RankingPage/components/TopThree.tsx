import { useErrorMessageStore } from "../../../app/errorMessageStore";
import { RankedUser } from "../../../types/rankedUser";
import TopItem from "./TopItem";

export default function TopThree({ data }: { data?: RankedUser[] }) {
    const setErrorMessage = useErrorMessageStore((state) => state.addMessage);

    if (data != undefined) {
        return <>
            <TopItem
                challenger={data[1]}
                rank={2}
            />
            <TopItem
                challenger={data[0]}
                rank={1}
            />
            <TopItem
                challenger={data[2]}
                rank={3}
            />
        </>

    } else {
        setErrorMessage('Une erreur s\'est produite');
        return <></>
    }

}