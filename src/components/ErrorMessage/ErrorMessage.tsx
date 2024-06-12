export default function ErrorMessage({ content }: { content: string }) {
    return <article className="error-message">
        {content}
    </article>
}