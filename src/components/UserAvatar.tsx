import { useState } from "react";
import { User } from "../types/user";
import Button from "./Button";

export default function UserAvatar({ user, onLogout }: { user: User, onLogout: () => void }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return <div className="logged-in-action" onClick={() => setIsExpanded(!isExpanded)}>
        <img src={user.profilePictureUrl} alt="" className="user-avatar" />
        {isExpanded && <UserActions user={user} onLogout={onLogout} />}
    </div>
}

function UserActions({ user, onLogout }: { user: User, onLogout: () => void }) {
    return <section>
        <p>{user.name}</p>
        <Button label="Logout" onClick={onLogout} />
    </section>
}