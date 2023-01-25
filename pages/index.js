import Link from "next/link"

export default function Home() {
  return (
    <div>
      <article className="bg-white py-6 px-4 rounded-2xl shadow mb-8">
        <h1 className="text-center font-bold text-3xl mb-4">How to Play</h1>
        <ul className="list-disc list-inside w-full flex flex-col gap-3 text-gray-600">
          <li>There's two Reddit posts that are randomly chosen from a list of ~100 subreddits.</li>
          <li>Posts are chosen from either "Hot," "Top by day," "Top by week," "Top by year," or "Top by all time" sorting.</li>
          <li>Choose the post that you think got more upvotes!</li>
          <li>If you select the wrong post, the game is over.</li>
          <li>CLICK ON LINKS AT YOUR OWN RISK. It is strongly advisable to stay on upvoteguesser.</li>
          <li>NOTE: upvoteguesser is not officially affiliated with Reddit in any way. This site just uses the public Reddit API to grab post data.</li>
        </ul>
      </article>
      <Link href="/game"><button className="w-full shadow p-4 bg-reddit-orange rounded-2xl text-white font-bold text-3xl">Play Game</button></Link>
    </div>
  )
}