import { Challenger } from "../../../types/challenger";

import crown from "../../../assets/images/crown.png";

type TopItemProps = {
    challenger: Challenger,
    rank: number,
}

export default function TopItem({ challenger, rank }: TopItemProps) {
    return <article className={`top-rank-item rank-${rank}`}>
        <p>{rank}</p>
        {rank == 1 && <img className="crown" src={crown}/>}
        <img src={challenger.profilePictureUrl} alt="winner picture" />
        <h4>{challenger.name}</h4>
        <p>345</p>
    </article>
}