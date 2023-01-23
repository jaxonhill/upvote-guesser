import Timer from "./Timer"

export default function Navbar() {
    return (
        <nav className="bg-white shadow flex justify-between py-2 px-4 items-center">
            <p className="tracking-wide">upvote<span className="font-bold text-reddit-orange">guesser</span></p>
            <Timer />
        </nav>
    )
}
