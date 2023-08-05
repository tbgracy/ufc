import { useQuery } from "@tanstack/react-query";

// components
import EntryCard from "./EntryCard";

import { EntriesService } from "../../../services/api";
import { Entry } from "../../../types/entry";

export default function EntryList() {
    const { isLoading, error, data } = useQuery(['entries'], () => {
        console.log('something happening');
        return EntriesService.getWeeksEntries()
    }
    );

    if (isLoading) {
        const entryElements = [];
        for (let i = 0; i < 6; i++) {
            entryElements.push(
                <EntryCard isLoading={true} />
            );
        }

        return <section className="entry-list">
            {entryElements}
        </section>
    }

    if (error) {
        return <section className="entry-list">An error has occured : </section>
    }

    const entryElements = data!.map((entry: Entry, i: number) => <EntryCard key={i} isLoading={false} entry={entry} />)

    return <section className="entry-list">
        {entryElements}
    </section>
}