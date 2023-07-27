import Navbar from "./Navbar";

export default function Page({ content }: { content: JSX.Element }) {
    return <>
        <Navbar />
        {content}
    </>
}