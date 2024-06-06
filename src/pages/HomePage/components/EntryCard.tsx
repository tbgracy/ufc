import { Entry } from "../../../types/entry"
import { BiLinkExternal } from "react-icons/bi"
import VotingSection from "./VotingSection";
import { useAppSelector } from "../../../app/hooks";


type EntryProps = {
    isLoading: boolean,
    entry?: Entry,
}

export default function EntryCard({ isLoading, entry }: EntryProps) {
    const className = isLoading ? "entry-card loading" : "entry-card";
    const user = useAppSelector(state => state.auth.user)

    if (isLoading) {
        return <article className="entry-card loading"></article>
    }

    return <article className={className}>
        <div className="entry-info">
            <img src="#" alt="preview" />
            <a href={entry!.homepage} target="_blank"><BiLinkExternal /></a>
        </div>
        <div className="author-info">
            <p>by {entry!.author.name}</p>
            <a href={entry!.author.profileUrl} target="_blank">
                <img src={entry!.author.profilePictureUrl} alt="" />
            </a>
            {user && <VotingSection />}
        </div>
    </article>
}