import Link from "next/link"

export default function Navbar({ userScore, setUserScore }) {
    return (
        <nav className="bg-white shadow">
            <div className="flex justify-between py-2 px-4 items-center max-w-6xl lg:px-0 lg:m-auto">
                <Link onClick={() => setUserScore(0)} href="/">
                    <p className="tracking-wide">upvote<span className="font-bold text-reddit-orange">guesser</span></p>
                </Link>
                <p className="font-bold text-3xl">{userScore}</p>
            </div>
        </nav>
    )
}
