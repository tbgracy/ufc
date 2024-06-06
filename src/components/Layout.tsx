import { Outlet } from "react-router-dom";
import { useErrorMessageStore } from "../app/errorMessageStore";
import ErrorMessage from "./ErrorMessage";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
    const errorMessage = useErrorMessageStore((state) => state.messages);

    return <>
        <Navbar />
        <aside className="error-message-container">
            {errorMessage.map(eM => <ErrorMessage content={eM} />)}
        </aside>
        <Outlet />
        <Footer />
    </>
}