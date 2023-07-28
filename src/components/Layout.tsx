import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ content }: { content: JSX.Element }) {
    return <>
        <Navbar />
        {content}
        <Footer />
    </>
}