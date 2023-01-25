import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Link href="/game"><button>Go to game</button></Link>
    </div>
  )
}