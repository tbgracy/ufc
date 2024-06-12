import EntryCard from "./EntryCard";

import { Entry } from "../../../types/entry";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchEntries } from "../entriesSlice";

export default function EntryList() {
    const entriesStatus = useAppSelector(state => state.entries.status)
    const entries = useAppSelector(state => state.entries.entries)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (entriesStatus === 'initial') {
            dispatch(fetchEntries())
        }
    }, [entriesStatus, dispatch])


    if (entriesStatus === 'loading' || entriesStatus === 'initial') {
        const entryElements = [];
        for (let i = 0; i < 6; i++) {
            entryElements.push(
                <EntryCard key={i} isLoading={true} />
            );
        }

        return <section className="entry-list">
            {entryElements}
        </section>
    }

    else {
        const entryElements = entries.map((entry: Entry, i: number) => <EntryCard key={i} isLoading={false} entry={entry} />)

        return (
            entryElements.length != 0
                ? (<section className="entry-list">{entryElements}</section>)
                : ("No entry yet for this week")
        )
    }
}