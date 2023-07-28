import { Entry } from "../types/entry";

export default function EntryCard({entry}: {entry: Entry}){
    return <article className="entry-card">
        <img src={entry.url} alt="" />
    </article>
}