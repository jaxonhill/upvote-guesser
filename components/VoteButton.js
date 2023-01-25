export default function VoteButton({ handleVote, post }) {
    return (
        <button onClick={() => handleVote(post)} className="bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold p-4 rounded-2xl shadow">
            VOTE
        </button>
    )
}
