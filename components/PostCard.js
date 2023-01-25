import CardBody from "./CardBody"
import CardHeading from "./CardHeading"

function formatUpvotes(upvotes) {
    return upvotes.toLocaleString("en-US");
}

export default function PostCard({ post, gameState, isRight }) {
    const formattedUpvotes = formatUpvotes(post.upvotes);
    let bgColor;
    switch (gameState) {
        case "playing":
            return (
                <article className="bg-white rounded-2xl shadow p-4">
                    <CardHeading subreddit={post.subreddit} title={post.title} />
                    <CardBody img={post.image} text={post.text} />
                </article>
            )
        case "roundWin":
            // Orange or gray box depending on if this was the correct post
            bgColor = (isRight) ? "bg-reddit-orange" : "bg-gray-400";
            return (
                <article className={`${bgColor} rounded-2xl shadow p-4 flex justify-center items-center`}>
                    <p className="text-white font-bold text-5xl">{formattedUpvotes}</p>
                </article>
            )
        case "roundLose":
            bgColor = (isRight) ? "bg-gray-600" : "bg-gray-400";
            return (
                <article className={`${bgColor} rounded-2xl shadow p-4 flex justify-center items-center`}>
                    <p className="text-white font-bold text-5xl">{formattedUpvotes}</p>
                </article>
            )
    }
}
