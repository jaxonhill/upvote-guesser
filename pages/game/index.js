import PostSection from "@/components/PostSection"
import { fetchPosts } from "@/utils/fetch_posts"
import { does_post_meet_conditions } from "@/utils/does_post_meet_conditions";
import { useState } from "react";

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

const getRequiredPostInfo = (post) => {
    let postInfo = {
        id: post["data"]["id"],
        subreddit: post["data"]["subreddit"],
        title: post["data"]["title"],
        upvotes: Number(post["data"]["ups"]),
    };

    // Set image to null or the image link depending on if it has one
    if (post["data"].hasOwnProperty("url_overridden_by_dest")) {
        postInfo["image"] = post["data"]["url_overridden_by_dest"];
    } else {
        postInfo["image"] = null;
    }

    return postInfo;
}

export default function GameScreen() {
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState(null);

    const getTwoRandomPosts = async () => {
        // Make two valid post arrays that have random subreddits
        // Will narrow it down later to 1 post each for the game
        const firstPostOptions = await fetch_valid_posts();
        const secondPostOptions = await fetch_valid_posts();
        console.log("FIRST POST OPTIONS: ", firstPostOptions);
        console.log("SECOND POST OPTIONS: ", secondPostOptions);

        // Make a random choice of which post to use for each
        const firstPostSelection = firstPostOptions[Math.floor(Math.random() * firstPostOptions.length)];
        const secondPostSelection = secondPostOptions[Math.floor(Math.random() * secondPostOptions.length)];

        // Return only the info you need
        const firstPost = getRequiredPostInfo(firstPostSelection);
        const secondPost = getRequiredPostInfo(secondPostSelection);

        return {
            first: firstPost,
            second: secondPost,
        }
    }

    // TODO: MOVE FUNCTIONS OUT THAT CAN BE MOVED OUT to utils
    // TODO: RENAME HANDLECLICK, not descriptive of what this does
    const handleClick = async () => {
        const { first, second } = await getTwoRandomPosts();
        setFirstPost(first);
        setSecondPost(second);
    }

    // Error checking: Check that both posts do not have the same upvotes or id. 
    // If they do, then refetch.
    if (firstPost && secondPost) {
        if (firstPost.id === secondPost.id) {
            handleClick();
        }
    }

    return (
        <div className="flex flex-col gap-12">
            <div>
                {firstPost && <p>{firstPost.title}</p>}
                {secondPost && <p>{secondPost.title}</p>}
            </div>
            <button onClick={handleClick} className="bg-white shadow py-2 rounded-2xl">New Round</button>
            <PostSection />
            <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
            <PostSection />
        </div>
    )
}
