import CardBody from "./CardBody"
import CardHeading from "./CardHeading"

export default function PostCard({ post }) {
    return (
        <article className="bg-white rounded-2xl shadow p-4">
            <CardHeading subreddit={post.subreddit} title={post.title} />
            <CardBody img={post.image} text={post.text} />
        </article>
    )
}
