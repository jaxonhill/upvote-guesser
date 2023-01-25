import Navbar from "./Navbar"

export default function Layout({ children, userScore }) {
    return (
        <div>
            <Navbar userScore={userScore} />
            <main className="my-8 mx-4">
                {children}
            </main>
            {/* <footer className="absolute bottom-0 w-full flex gap-2 mt-8 items-center justify-between bg-white border-t border-t-gray-200 p-2">
                <p className="text-gray-600">By Jaxon Hill</p>
                <a href="https://jaxonhill.xyz/" className="text-blue-400 cursor-pointer hover:underline">jaxonhill.xyz</a>
            </footer> */}
        </div>
    )
}
