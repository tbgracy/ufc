export default function NavLink({ target, label, isCurrent }: { target: string, label: string, isCurrent: boolean }) {
    return <li className={isCurrent ? "current-page" : ""}><a href={target}>{label}</a></li>;
}