import PostCard from "./PostCard"
import VoteButton from "./VoteButton"

export default function PostSection({ post, handleVote }) {
    return (
        <div className="flex flex-col gap-4">
            <PostCard post={post} />
            <VoteButton handleVote={handleVote} post={post} />
        </div>
    )
}
