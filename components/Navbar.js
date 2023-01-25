export default function Navbar({ userScore }) {
    return (
        <nav className="bg-white shadow flex justify-between py-2 px-4 items-center">
            <p className="tracking-wide">upvote<span className="font-bold text-reddit-orange">guesser</span></p>
            <p className="font-bold text-3xl">{userScore}</p>
        </nav>
    )
}
