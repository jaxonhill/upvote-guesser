import Navbar from "./Navbar"

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <main className="my-8 mx-4">
                {children}
            </main>
        </div>
    )
}
