import PostSection from "@/components/PostSection"
import { get_two_random_posts } from "@/utils/get_two_random_posts";
import { useState } from "react";

// gameState = ["loading", "error", "playing", "roundWin", "gameOver"]

export default function GameScreen() {
    // REFACTOR A LOT
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState(null);
    const [userScore, setUserScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [gameState, setGameState] = useState("playing");

    // Calculate correct answer based on first and second post info
    let correctAnswerID;
    if (firstPost && secondPost) {
        if (firstPost.upvotes > secondPost.upvotes) {
            correctAnswerID = firstPost.id;
        } else {
            correctAnswerID = secondPost.id;
        }
    }

    const handleStartRound = async () => {
        setGameState("loading");
        await getAndSetBothPosts();
        setGameState("playing");
    }

    const getAndSetBothPosts = async () => {
        const { first, second } = await get_two_random_posts();
        setFirstPost(first);
        setSecondPost(second);
    }

    function handleVote(chosenPost) {
        setUserAnswer(chosenPost.id);
        if (chosenPost.id === correctAnswerID) {
            setUserScore(prevScore => prevScore + 1);
            setGameState("roundWin");
        } else {
            setGameState("gameOver");
        }
    }

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
                    {firstPost && <PostSection post={firstPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                    <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
                    {secondPost && <PostSection post={secondPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                    <button onClick={handleStartRound} className="w-full bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold py-2 px-4 rounded-2xl">Next Round</button>
                </div>
            )
        case ("roundWin"):
            return (
                <div>
                    <p className="text-center font-bold text-reddit-orange text-3xl">Correct!</p>
                    <div className="flex flex-col gap-4 mt-6 pb-16 mb-12 border-b-2 border-b-gray-200">
                        {firstPost && <PostSection post={firstPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                        <p className="text-center text-gray-300 font-bold text-5xl">OR</p>
                        {secondPost && <PostSection post={secondPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === secondPost.id} />}
                    </div>
                    <button onClick={handleStartRound} className="w-full bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold py-2 px-4 rounded-2xl">Next Round</button>
                </div>
            )
        case ("gameOver"):
            return (
                <p className="text-center">Game Over!</p>
            )
        case ("loading"):
            return (
                <p className="text-center">Loading!</p>
            )
        default:
            return (
                <p className="text-center">Error...</p>
            )
    }
}
