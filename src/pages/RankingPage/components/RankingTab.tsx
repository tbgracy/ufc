import { Timeframe } from "../RankingPage";

type RankingPageProps = {
    timeframe: 'weekly' | 'all-time',
    onTabChange: (newTab: Timeframe) => void,
}

export default function RankingPage({ timeframe, onTabChange }: RankingPageProps) {
    function toggleTimeframe() {
        onTabChange(timeframe == 'weekly' ? 'all-time' : 'weekly')
    }

    return <>
        <ul className="tab-ranking">
            <li
                className={timeframe == 'weekly' ? 'active' : ''}
                onClick={timeframe != 'weekly' ? toggleTimeframe : () => { }}
            >
                Weekly
            </li>
            <li
                className={timeframe == 'all-time' ? 'active' : ''}
                onClick={timeframe != 'all-time' ? toggleTimeframe : () => { }}
            >
                All-time
            </li>
        </ul>
    </>
}