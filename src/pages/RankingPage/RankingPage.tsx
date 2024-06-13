import { useState } from "react";

import RankingTab from "./components/RankingTab";
import { Timeframe } from "../../types/timeframe";

export default function RankingPage() {
    const [timeframe, setTimeframe] = useState<Timeframe>('weekly');

    return <main>
        <RankingTab timeframe={timeframe} onTabChange={(newTab: Timeframe) => setTimeframe(newTab)} />
    </main>
} 