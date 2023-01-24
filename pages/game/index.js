import PostSection from "@/components/PostSection"
import { get_two_random_posts } from "@/utils/get_two_random_posts";
import { useState } from "react";

export default function GameScreen() {
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState(null);
    const [correctAnswerID, setCorrectAnswerID] = useState(null);
    const [userScore, setUserScore] = useState(0);
    const [gameState, setGameState] = useState("playing");


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
        if (chosenPost.id === correctAnswerID) {
            setGameState("roundWin");
        } else {
            setGameState("gameOver");
        }
    }

    console.log(firstPost);
    console.log(secondPost);

    // Error checking: Check that both posts do not have the same upvotes or id. 
    // If they do, then refetch. MAKE THIS INTO THE FUNCTION (get_random_posts). SHOULD NOT BE OUT HERE.
    if (firstPost && secondPost) {
        if (firstPost.id === secondPost.id || firstPost.upvotes === secondPost.upvotes) {
            handleRoundStart();
        }
    }

    switch (gameState) {
        case ("playing"):
            return (
                <div className="flex flex-col gap-12">
                    <button onClick={handleRoundStart} className="bg-white shadow py-2 rounded-2xl">New Round</button>
                    {firstPost && <PostSection post={firstPost} handleVote={handleVote} />}
                    <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
                    {secondPost && <PostSection post={secondPost} handleVote={handleVote} />}
                </div>
            )
        case ("roundWin"):
            return (
                <p className="text-center">Correct!</p>
            )
        case ("gameOver"):
            return (
                <p className="text-center">Game Over!</p>
            )
    }
}
