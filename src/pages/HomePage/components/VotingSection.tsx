import { BiHeart } from "react-icons/bi";
import { Entry } from "../../../types/entry";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { voteEntry } from "../entriesSlice";

export default function VotingSection({ entry }: { entry: Entry }) {
    const dispatch = useAppDispatch()
    const votingStatus = useAppSelector(state => state.entries.votingStatus)
    const user = useAppSelector(state => state.auth.user)
    const canVote = votingStatus === 'idle' && Boolean(user)

    const className = `voting ${entry.voted ? 'voted' : ''} ${canVote ? '' : 'disabled'}`

    function handleVotingIconClick() {
        dispatch(voteEntry(entry.id))
    }

    return <div className={className}>
        <BiHeart size={24} onClick={canVote ? handleVotingIconClick : () => { }} />
        {entry.voteCount}
    </div>
}