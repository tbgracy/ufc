import { useEffect, useRef } from "react"

export default function HamburgerMenu() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current!.onclick = () => {
            ref.current!.toggleAttribute('menu-open')
        }
    }, [ref])

    return <div ref={ref} className="hamburger-menu">
        <div></div>
        <div></div>
    </div>
}