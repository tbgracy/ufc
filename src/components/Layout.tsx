import { useErrorMessageStore } from "../store/errorMessageStore";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ content }: { content: JSX.Element }) {
    const errorMessage = useErrorMessageStore((state) => state.message);

    return <>
        <Navbar />
        {errorMessage}
        {content}
        <Footer />
    </>
}