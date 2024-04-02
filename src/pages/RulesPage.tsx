export default function RulesPage() {
    return <main>
        <h2>Rules</h2>
        <section className="rule-card">
            <h3>Challengers' rules</h3>
            <p>
                Every saturday, a new challenge begins and the result of the preceding week is
                forged in stone.
                To participate, follow the following steps (these are more guidlines than rules) :
            </p>
            <ol>
                <li>Register</li>
                <li>Go to homepage to see the current design</li>
                <li>Create a repository with the following pattern for every entry : <pre>ufc-w&lt;week-number&gt;[-anything-you-want];</pre></li>
                <li>Push your entry to the repository</li>
            </ol>
            <p>Don't forget to have fun :D</p>
        </section>
        <section className="rule-card">
            <h3>How points are calculated</h3>
            <p>point = upvotes + lighthouse performance</p>
        </section>
        <section className="rule-card">
            <h3>Voters' rules</h3>
            <ol>
                <li>Login</li>
                <li>Sign in</li>
                <li>Go to home page to see this week's entries</li>
                <li>Upvote for one or more of your favorite entries</li>
            </ol>
            <p>That's it :D</p>
        </section>
    </main>
}