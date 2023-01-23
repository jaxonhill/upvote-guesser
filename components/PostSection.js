import PostCard from "./PostCard"
import VoteButton from "./VoteButton"

export default function PostSection() {
    return (
        <div className="flex flex-col gap-4">
            <PostCard />
            <VoteButton />
        </div>
    )
}
