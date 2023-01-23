import PostSection from "@/components/PostSection"
import { fetchPosts } from "@/utils/fetch_posts"
import { useState, useEffect } from "react";

// Just have to write whether the "url_overridden_by_dest" character is an "i"
// It could also be a v for video or y for youtube, so just only grab the images ones

export default function GameScreen() {
    const [fetchedPosts, setFetchedPosts] = useState([]);

    useEffect(() => {
        fetchPosts()
            .then(posts => setFetchedPosts(posts));
    }, [])

    console.log(fetchedPosts);

    return (
        <div className="flex flex-col gap-12">
            <PostSection />
            <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
            <PostSection />
        </div>
    )
}
