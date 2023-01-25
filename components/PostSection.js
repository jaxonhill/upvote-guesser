import PostCard from "./PostCard"
import VoteButton from "./VoteButton"

export default function PostSection({ post, handleVote, gameState, isRight }) {
    return (
        <div className="flex flex-col gap-4">
            <PostCard post={post} gameState={gameState} isRight={isRight} />
            {gameState === "playing" && <VoteButton handleVote={handleVote} post={post} />}
        </div>
    )
}
