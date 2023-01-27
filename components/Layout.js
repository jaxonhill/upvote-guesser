import Navbar from "./Navbar"
import { AnimatePresence, motion } from "framer-motion"

export default function Layout({ children, userScore, setUserScore }) {
    return (
        <div>

            <Navbar userScore={userScore} setUserScore={setUserScore} />
            <main className="my-8 mx-4 lg:max-w-6xl lg:mx-auto">
                {children}
            </main>
            {/* <footer className="absolute bottom-0 w-full flex gap-2 mt-8 items-center justify-between bg-white border-t border-t-gray-200 p-2">
                <p className="text-gray-600">By Jaxon Hill</p>
                <a href="https://jaxonhill.xyz/" className="text-blue-400 cursor-pointer hover:underline">jaxonhill.xyz</a>
            </footer> */}
        </div>
    )
}
