import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { toggleTimeframe } from "../rankingSlice"

export default function RankingTab() {
    const dispatch = useAppDispatch()
    const currentTimeframe = useAppSelector(state => state.ranking.timeframe)

    function handleTimeframeToggle() {
        dispatch(toggleTimeframe())
    }

    return <>
        <ul className="tab-ranking">
            <li
                className={currentTimeframe == 'weekly' ? 'active' : ''}
                onClick={handleTimeframeToggle}
            >
                Weekly
            </li>
            <li
                className={currentTimeframe == 'all-time' ? 'active' : ''}
                onClick={handleTimeframeToggle}
            >
                All-time
            </li>
        </ul>
    </>
}