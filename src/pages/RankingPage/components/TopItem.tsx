import crown from "../../../assets/images/crown.png";
import { RankedUser } from "../../../types/rankedUser";

type TopItemProps = {
    challenger: RankedUser,
    rank: number,
}

export default function TopItem({ challenger, rank }: TopItemProps) {
    return <article className={`top-rank-item rank-${rank}`}>
        <p>{rank}</p>
        {rank == 1 && <img className="crown" src={crown}/>}
        <img src={challenger.profilePictureUrl} alt="winner picture" />
        <h4>{challenger.fullName}</h4>
        <p>345</p>
    </article>
}