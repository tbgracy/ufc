import { useErrorMessageStore } from "../store/errorMessageStore";
import ErrorMessage from "./ErrorMessage";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ content }: { content: JSX.Element }) {
    const errorMessage = useErrorMessageStore((state) => state.messages);

    return <>
        <Navbar />
        <aside className="error-message-container">
            {errorMessage.map(eM => <ErrorMessage content={eM} />)}
        </aside>
        {content}
        <Footer />
    </>
}