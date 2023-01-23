import PostSection from "@/components/PostSection"

export default function GameScreen() {
    return (
        <div className="flex flex-col gap-12">
            <PostSection />
            <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
            <PostSection />
        </div>
    )
}
