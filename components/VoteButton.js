export default function VoteButton({ handleVote, post }) {
    return (
        <button onClick={() => handleVote(post)} className="bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold py-2 px-4 rounded-2xl">
            VOTE
        </button>
    )
}
