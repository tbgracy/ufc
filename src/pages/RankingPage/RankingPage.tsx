import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RankingTab from "./components/RankingTab";
import TopItem from "./components/TopItem";
import { fetchRankedChallengers } from "./rankingSlice";
import { FaSpinner } from "react-icons/fa";

export default function RankingPage() {
    const dispatch = useAppDispatch()

    const challengers = useAppSelector(state => state.ranking.challengers)
    const status = useAppSelector(state => state.ranking.status)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRankedChallengers())
        }
    }, [status, dispatch])

    return <main>
        <RankingTab />
        {status !== 'done'
            ? <FaSpinner id="ranking-spinner" />
            : <>
                {challengers.length === 0 ? <p>No challengers for now</p> :
                    <section className="top-three">
                        {challengers[1] && <TopItem challenger={challengers[1]} rank={2} />}
                        {challengers[0] && <TopItem challenger={challengers[0]} rank={1} />}
                        {challengers[2] && <TopItem challenger={challengers[2]} rank={3} />}
                    </section>
                }
                <section className="ranking-others">
                </section>
            </>
        }
    </main>
} 