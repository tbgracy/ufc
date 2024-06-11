import { useAppSelector } from "../../app/hooks";
import EntryList from "./components/EntryList";
import Tab from "./components/Tab";


export default function HomePage() {
    const timeframe = useAppSelector(state => state.entries.timeframe)
    const title = {
        'weekly': "This week's entries",
        'all-time': "All-time entries"
    }[timeframe]

    return <main>
        <h2>{title}</h2>
        <Tab />
        <EntryList />
    </main>
}
