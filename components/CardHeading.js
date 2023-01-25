export default function CardHeading({ subreddit, title }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <p className="text-gray-600">r/{subreddit}</p>
            </div>
            <h1 className="font-bold">{title}</h1>
        </div>
    )
}
