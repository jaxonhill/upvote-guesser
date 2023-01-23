import PostSection from "@/components/PostSection"
import { fetchPosts } from "@/utils/fetch_posts"
import { does_post_meet_conditions } from "@/utils/does_post_meet_conditions";

const fetch_valid_posts = async () => {
    let validPosts = [];

    // Fetch validPosts until we have at least 1 in the array
    while (validPosts.length <= 0) {
        const fetchedPosts = await fetchPosts();
        validPosts = fetchedPosts.filter(post => does_post_meet_conditions(post));
    }

    // If we are here, we have at least 1 valid post in the array
    return validPosts;
}

export default function GameScreen() {

    const handleNewRound = async () => {
        // Make two valid post arrays that have random subreddits
        // Will narrow it down later to 1 post each for the game
        const firstPostOptions = await fetch_valid_posts();
        const secondPostOptions = await fetch_valid_posts();
        console.log("FIRST POST OPTIONS: ", firstPostOptions);
        console.log("SECOND POST OPTIONS: ", secondPostOptions);
    }

    return (
        <div className="flex flex-col gap-12">
            <button onClick={handleNewRound} className="bg-white shadow py-2 rounded-2xl">New Round</button>
            <PostSection />
            <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
            <PostSection />
        </div>
    )
}
