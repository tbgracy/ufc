import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ServicesContext } from "../../contexts";

import RankingTab from "./components/RankingTab";
import TopThree from "./components/TopThree";
import { useErrorMessageStore } from "../../store/errorMessageStore";

export type Timeframe = 'weekly' | 'all-time';

export default function RankingPage() {
    const [timeframe, setTimeframe] = useState<Timeframe>('weekly');
    const setErrorMessage = useErrorMessageStore((state) => state.addMessage);

    const service = useContext(ServicesContext).ranking;

    const { error, data } = useQuery(['ranking'], () => {
        return timeframe == 'weekly' ? service.getWeeklyRanking() : service.getAllTimeRanking();
    })

    if (error) {
        setErrorMessage(error.toString());
    }

    return <main>
        <RankingTab timeframe={timeframe} onTabChange={(newTab: Timeframe) => setTimeframe(newTab)} />
        {data instanceof Error ? <TopThree /> : <TopThree data={data} />}
    </main>
} 