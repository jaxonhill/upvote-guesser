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
        setGameState("playing");
    }

    function handleVote(chosenPost) {
        if (chosenPost.id === correctAnswerID) {
            setGameState("roundWin");
            setUserScore(prevScore => prevScore + 1);
        } else {
            setGameState("gameOver");
        }

        // Clean up round and delete all posts and right answers
        setFirstPost(null);
        setSecondPost(null);
        setCorrectAnswerID(null);
    }

    console.log(firstPost);
    console.log(secondPost);
    console.log(userScore);

    // Error checking: Check that both posts do not have the same upvotes or id. 
    // If they do, then refetch. MAKE THIS INTO THE FUNCTION (get_random_posts). SHOULD NOT BE OUT HERE.
    if (firstPost && secondPost) {
        if (firstPost.id === secondPost.id || firstPost.upvotes === secondPost.upvotes) {
            handleRoundStart();
        }
    }

    switch (gameState) {
        case ("playing"):
            // Ensure we have the posts, then display them
            if (firstPost && secondPost) {
                return (
                    <div className="flex flex-col gap-12">
                        {firstPost && <PostSection post={firstPost} handleVote={handleVote} />}
                        <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
                        {secondPost && <PostSection post={secondPost} handleVote={handleVote} />}
                    </div>
                )
            } else {    // Posts aren't loaded
                return (
                    <div>
                        <p>Loading...</p>
                        <button onClick={handleRoundStart} className="bg-white shadow py-2 rounded-2xl">New Round</button>
                    </div>
                )
            }
        case ("roundWin"):
            return (
                <div>
                    <p className="text-center">Correct!</p>
                    <button onClick={handleRoundStart} className="bg-white shadow py-2 rounded-2xl">New Round</button>
                </div>
            )
        case ("gameOver"):
            return (
                <p className="text-center">Game Over!</p>
            )
    }
}
