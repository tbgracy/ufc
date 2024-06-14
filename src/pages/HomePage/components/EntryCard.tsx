import { Entry } from "../../../types/entry"
import { BiLinkExternal } from "react-icons/bi"
import VotingSection from "./VotingSection";
import placholderAvatar from "../../../assets/images/avatar-placeholder.svg"


type EntryProps = {
    isLoading: boolean,
    entry?: Entry,
}

export default function EntryCard({ isLoading, entry }: EntryProps) {
    const className = isLoading ? "entry-card loading" : "entry-card";

    if (isLoading) {
        return <article className="entry-card loading"></article>
    }

    return <article className={className}>
        <div className="entry-info">
            {entry?.homepage
                ? <>
                    <img loading="lazy" src={`//image.thum.io/get/${entry?.homepage}`} alt="Website preview" />
                    <a href={entry?.homepage} target="_blank"><BiLinkExternal /></a>
                </>
                : <img src={placholderAvatar} />
            }
        </div>
        <div className="author-info">
            <a href={entry!.author.profileUrl} target="_blank">
                <img src={entry?.author.profilePictureUrl ?? placholderAvatar} alt="" />
            </a>
            <p>{entry!.author.fullName}</p>
            <VotingSection entry={entry!} />
        </div>
    </article>
}