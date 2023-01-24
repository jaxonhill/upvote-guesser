import PostSection from "@/components/PostSection"
import { get_two_random_posts } from "@/utils/get_two_random_posts";
import { useState } from "react";

export default function GameScreen() {
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState(null);
    const [correctAnswerID, setCorrectAnswerID] = useState(null);
    const [userAnswerID, setUserAnswerID] = useState(null);


    const getAndSetPostsAndRightAnswer = async () => {
        const { first, second } = await get_two_random_posts();

        setFirstPost(first);
        setSecondPost(second);

        if (first.upvotes > second.upvotes) {
            setCorrectAnswerID(first.id);
        } else {
            setCorrectAnswerID(second.id);
        }
    }

    function handleRoundStart() {
        getAndSetPostsAndRightAnswer();
    }

    function handleVote(chosenPost) {
        setUserAnswerID(chosenPost.id);
    }

    console.log(firstPost);
    console.log(secondPost);
    console.log(userAnswerID);
    console.log(correctAnswerID)

    // Error checking: Check that both posts do not have the same upvotes or id. 
    // If they do, then refetch.
    if (firstPost && secondPost) {
        if (firstPost.id === secondPost.id || firstPost.upvotes === secondPost.upvotes) {
            handleRoundStart();
        }
    }

    return (
        <div className="flex flex-col gap-12">
            {(userAnswerID && (userAnswerID === correctAnswerID)) && <p>Correct!</p>}
            <button onClick={handleRoundStart} className="bg-white shadow py-2 rounded-2xl">New Round</button>
            {firstPost && <PostSection post={firstPost} handleVote={handleVote} />}
            <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
            {secondPost && <PostSection post={secondPost} handleVote={handleVote} />}
        </div>
    )
}
