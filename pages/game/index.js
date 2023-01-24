import PostSection from "@/components/PostSection"
import { get_two_random_posts } from "@/utils/get_two_random_posts";
import { useState } from "react";

export default function GameScreen() {
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState(null);

    // TODO: RENAME HANDLECLICK, not descriptive of what this does
    const fetchAndSetNewPosts = async () => {
        const { first, second } = await get_two_random_posts();
        setFirstPost(first);
        setSecondPost(second);
    }

    // Error checking: Check that both posts do not have the same upvotes or id. 
    // If they do, then refetch.
    if (firstPost && secondPost) {
        if (firstPost.id === secondPost.id) {
            fetchAndSetNewPosts();
        }
    }

    console.log(firstPost);
    console.log(secondPost);

    return (
        <div className="flex flex-col gap-12">
            {/* <div>
                {firstPost && <p>{firstPost.title}</p>}
                {secondPost && <p>{secondPost.title}</p>}
            </div> */}
            <button onClick={fetchAndSetNewPosts} className="bg-white shadow py-2 rounded-2xl">New Round</button>
            {firstPost && <PostSection post={firstPost} />}
            <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
            {secondPost && <PostSection post={secondPost} />}
        </div>
    )
}
