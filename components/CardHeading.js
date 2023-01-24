export default function CardHeading({ subreddit, title }) {
    return (
        <div className="flex flex-col gap-2 pb-4 border-b border-b-gray-200">
            <div className="flex gap-2">
                {/* <div className="w-6 h-6 rounded-full bg-gray-300"></div> */}
                <p className="text-gray-600">r/{subreddit}</p>
            </div>
            <h1 className="font-bold">{title}</h1>
        </div>
    )
}
