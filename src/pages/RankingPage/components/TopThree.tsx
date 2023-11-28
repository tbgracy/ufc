import { useErrorMessageStore } from "../../../store/errorMessageStore";
import { RankedUser } from "../../../types/rankedUser";
import TopItem from "./TopItem";

export default function TopThree({ data }: { data?: RankedUser[] }) {
    const setErrorMessage = useErrorMessageStore((state) => state.setMessage);

    if (data != undefined) {
        <>
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
    }

}