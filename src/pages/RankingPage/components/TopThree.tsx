import TopItem from "./TopItem";

export default function TopThree() {
    return <section className="top-three">
        <TopItem
            challenger={{
                name: 'Gracy Botramanagna',
                profileUrl: 'https://github.com/tbgracy',
                profilePictureUrl: 'https://github.com/tbgracy/profile',
            }}
            rank={2}
        />
        <TopItem
            challenger={{
                name: 'Gracy Botramanagna',
                profileUrl: 'https://github.com/tbgracy',
                profilePictureUrl: 'https://github.com/tbgracy/profile',
            }}
            rank={1}
        />
        <TopItem
            challenger={{
                name: 'Gracy Botramanagna',
                profileUrl: 'https://github.com/tbgracy',
                profilePictureUrl: 'https://github.com/tbgracy/profile',
            }}
            rank={3}
        />
    </section>
}