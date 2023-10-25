import { Entry } from "../../../types/entry"
import { BiLinkExternal } from "react-icons/bi"

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
            <img src="#" alt="preview" />
            <a href={entry!.homepage} target="_blank"><BiLinkExternal /></a>
        </div>
        <div className="author-info">
            <p>by {entry!.author.name}</p>
            <a href={entry!.author.profileUrl} target="_blank">
                <img src={entry!.author.profilePictureUrl} alt="" />
            </a>
        </div>
    </article>
}