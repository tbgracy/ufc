import crown from "../../../assets/images/crown.png";
import { Challenger } from "../../../types/challenger";

type TopItemProps = {
    challenger: Challenger
    rank: 1 | 2 | 3
}

export default function TopItem({ challenger, rank }: TopItemProps) {
    return <article className={`top-rank-item rank-${rank}`}>
        <p>{rank}</p>
        {rank == 1 && <img className="crown" src={crown} />}
        <img src={challenger.profilePictureUrl} alt="winner picture" />
        <h4>{challenger.fullName}</h4>
    </article>
}