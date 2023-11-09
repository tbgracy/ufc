import { useState } from "react"

export default function RankingPage() {
    const [timeframe, setTimeframe] = useState<'weekly' | 'all-time'>('weekly');
    function toggleTimeframe() {
        setTimeframe(timeframe == 'weekly' ? 'all-time' : 'weekly')
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