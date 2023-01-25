import Navbar from "./Navbar"

export default function Layout({ children, userScore }) {
    return (
        <div>
            <Navbar userScore={userScore} />
            <main className="my-8 mx-4">
                {children}
            </main>
        </div>
    )
}
