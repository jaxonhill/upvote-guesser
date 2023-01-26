import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-2xl m-auto"
    >
      <article className="bg-white py-6 px-4 rounded-2xl shadow mb-8">
        <h1 className="text-center font-bold text-3xl mb-4">How to Play</h1>
        <ul className="list-disc list-inside w-full flex flex-col gap-2 text-gray-600">
          <li>There's two Reddit posts that are randomly chosen from a list of ~100 subreddits.</li>
          <li>From each post, you will receive the: title, main image, and a small snippet of the text. Varies from post to post.</li>
          <li>Posts are chosen from either "Hot," "Top by day," "Top by week," "Top by year," or "Top by all time" sorting.</li>
          <li>Choose the post that you think got more upvotes!</li>
          <li>If you select the wrong post, the game is over.</li>
          <li>CLICK ON LINKS AT YOUR OWN RISK. It is strongly advisable to stay on upvoteguesser.</li>
          <li>NOTE: upvoteguesser is not officially affiliated with Reddit in any way. This site just uses the public Reddit API to grab post data.</li>
        </ul>
      </article>
      <Link href="/game">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.80 }}
          className="w-full shadow p-4 bg-reddit-orange rounded-2xl text-white font-bold text-3xl"
        >
          Play Game
        </motion.button>
      </Link>
    </motion.div>
  )
}