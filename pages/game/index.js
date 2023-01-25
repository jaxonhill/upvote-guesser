import PostSection from "@/components/PostSection"
import { get_two_random_posts } from "@/utils/get_two_random_posts";
import { useEffect, useState } from "react";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";

// gameState = ["loading", "error", "playing", "roundWin", "roundLose", "gameOver"]

export default function GameScreen({ userScore, setUserScore }) {
    // REFACTOR A LOT
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [gameState, setGameState] = useState("playing");
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        handleStartGame();
    }, [])

    // Calculate correct answer based on first and second post info
    let correctAnswerID;
    if (firstPost && secondPost) {
        if (firstPost.upvotes > secondPost.upvotes) {
            correctAnswerID = firstPost.id;
        } else {
            correctAnswerID = secondPost.id;
        }
    }

    const handleStartGame = () => {
        setUserScore(0);
        handleStartRound();
        setIsCopied(false);
    }

    const handleStartRound = async () => {
        setUserAnswer(null);
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
            setGameState("roundLose");
        }
    }

    // Error checking: Check that both posts do not have the same upvotes or id. 
    // If they do, then refetch. MAKE THIS INTO THE FUNCTION (get_random_posts). SHOULD NOT BE OUT HERE.
    // if (firstPost && secondPost) {
    //     if (firstPost.id === secondPost.id || firstPost.upvotes === secondPost.upvotes) {
    //         handleStartRound();
    //     }
    // }

    switch (gameState) {
        case ("playing"):
            return (
                <div className="flex flex-col gap-12">
                    {firstPost && <PostSection post={firstPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                    <p className="text-center text-gray-600 font-bold text-5xl">OR</p>
                    {secondPost && <PostSection post={secondPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
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
                    <button onClick={handleStartRound} className="w-full bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold p-4 rounded-2xl shadow">Next Round</button>
                </div>
            )
        case ("roundLose"):
            return (
                <div>
                    <p className="text-center font-bold text-gray-800 text-3xl">Wrong</p>
                    <div className="flex flex-col gap-4 mt-6 pb-16 mb-12 border-b-2 border-b-gray-200">
                        {firstPost && <PostSection post={firstPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                        <p className="text-center text-gray-300 font-bold text-5xl">OR</p>
                        {secondPost && <PostSection post={secondPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === secondPost.id} />}
                    </div>
                    <button onClick={() => setGameState("gameOver")} className="w-full bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold p-4 rounded-2xl shadow">Next</button>
                </div>
            )
        case ("gameOver"):
            return (
                <article className="bg-white rounded-2xl shadow p-8 flex flex-col items-center">
                    <p className="text-3xl text-gray-600 mb-4">
                        Final Score:
                    </p>
                    <p className="text-reddit-orange font-bold text-5xl mb-8">{userScore}</p>
                    {isCopied && <p className="text-xl text-gray-600 mb-4 font-bold">Copied to clipboard!</p>}
                    <div className="w-full flex flex-col gap-4">
                        <CopyToClipboard
                            text={`I guessed ${userScore} post${userScore !== 1 ? 's' : ''} in a row! Can you do better on upvoteguesser.com?`}
                            onCopy={() => setIsCopied(true)}
                        >
                            <button className="bg-reddit-orange w-full text-3xl font-bold text-white p-4 rounded-2xl shadow">Share</button>
                        </CopyToClipboard>
                        <Link onClick={() => setUserScore(0)} href="/"><button className="bg-white border-2 w-full text-3xl border-reddit-orange text-reddit-orange p-4 font-bold rounded-2xl">Back home</button></Link>
                    </div>
                </article>
            )
        case ("loading"):
            return (
                <p className="text-center">Loading!</p>
            )
        default:
            return (
                <div className="flex flex-col items-center gap-4">
                    <h1 className="font-bold text-5xl">Error!</h1>
                    <p className="text-gray-600 text-center pb-4">Something went wrong... Please start another game.</p>
                    <div className="w-full pt-8 border-t-2 border-t-gray-200">
                        <Link className="w-full" onClick={() => setUserScore(0)} href="/">
                            <button className="bg-white border-2 w-full text-3xl border-reddit-orange text-reddit-orange p-4 font-bold rounded-2xl">Back home</button>
                        </Link>
                    </div>
                </div>
            )
    }
}
