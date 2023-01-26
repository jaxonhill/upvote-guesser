import { motion } from "framer-motion"

export default function VoteButton({ handleVote, post }) {
    return (
        <motion.button
            onClick={() => handleVote(post)}
            className="bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold p-4 rounded-2xl shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.80 }}
        >
            VOTE
        </motion.button>
    )
}
