import PostSection from "@/components/PostSection"
import { get_two_random_posts } from "@/utils/get_two_random_posts";
import { useEffect, useState } from "react";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// gameState = ["loading", "error", "playing", "roundWin", "roundLose", "gameOver"]

export default function GameScreen({ userScore, setUserScore }) {
    // REFACTOR A LOT
    const [firstPost, setFirstPost] = useState(null);
    const [secondPost, setSecondPost] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [gameState, setGameState] = useState("loading");
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

    switch (gameState) {
        case ("playing"):
            return (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-12 lg:flex-row"
                >
                    {firstPost && <PostSection post={firstPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                    <p className="text-center text-gray-600 font-bold text-5xl self-center">OR</p>
                    {secondPost && <PostSection post={secondPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                </motion.div>
            )
        case ("roundWin"):
            return (
                <motion.article
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="lg:flex lg:flex-col"
                >
                    <p className="text-center font-bold text-reddit-orange text-3xl lg:text-5xl">Correct!</p>
                    <div className="flex flex-col gap-4 mt-6 pb-16 mb-12 border-b-2 border-b-gray-200 lg:flex-row lg:mt-12">
                        {firstPost && <PostSection post={firstPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                        <p className="text-center text-gray-300 font-bold text-5xl lg:self-center lg:px-8">OR</p>
                        {secondPost && <PostSection post={secondPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === secondPost.id} />}
                    </div>
                    <motion.button
                        onClick={handleStartRound}
                        className="w-full bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold p-4 rounded-2xl shadow lg:max-w-sm lg:self-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.80 }}
                    >
                        Next Round
                    </motion.button>
                </motion.article>
            )
        case ("roundLose"):
            return (
                <motion.article
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="lg:flex lg:flex-col"
                >
                    <p className="text-center font-bold text-gray-800 text-3xl lg:text-5xl">Wrong</p>
                    <div className="flex flex-col gap-4 mt-6 pb-16 mb-12 border-b-2 border-b-gray-200 lg:flex-row lg:mt-12">
                        {firstPost && <PostSection post={firstPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === firstPost.id} />}
                        <p className="text-center text-gray-300 font-bold text-5xl lg:self-center lg:px-8">OR</p>
                        {secondPost && <PostSection post={secondPost} handleVote={handleVote} gameState={gameState} isRight={correctAnswerID === secondPost.id} />}
                    </div>
                    <motion.button
                        onClick={() => setGameState("gameOver")}
                        className="w-full bg-white border-2 border-reddit-orange text-reddit-orange text-3xl font-bold p-4 rounded-2xl shadow lg:max-w-sm lg:self-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.80 }}
                    >
                        Next
                    </motion.button>
                </motion.article>
            )
        case ("gameOver"):
            return (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-2xl shadow p-8 flex flex-col items-center lg:max-w-2xl lg:m-auto"
                >
                    <p className="text-3xl text-gray-600 mb-4">
                        Final Score:
                    </p>
                    <p className="text-reddit-orange font-bold text-5xl mb-8">{userScore}</p>
                    {isCopied && <p className="text-xl text-gray-600 mb-4 font-bold">Copied to clipboard!</p>}
                    <div className="w-full flex flex-col gap-4">
                        <CopyToClipboard
                            text={`I guessed ${userScore} post${userScore !== 1 ? 's' : ''} in a row! Can you do better on https://upvoteguesser.com/?`}
                            onCopy={() => setIsCopied(true)}
                        >
                            <motion.button
                                className="bg-reddit-orange w-full text-3xl font-bold text-white p-4 rounded-2xl shadow"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.80 }}
                            >
                                Share
                            </motion.button>
                        </CopyToClipboard>
                        <Link onClick={() => setUserScore(0)} href="/">
                            <motion.button
                                className="bg-white border-2 w-full text-3xl border-reddit-orange text-reddit-orange p-4 font-bold rounded-2xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.80 }}
                            >
                                Back home
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            )
        case ("loading"):
            return (
                <div className="text-center font-bold text-5xl">
                    <TypeAnimation
                        sequence={[
                            "Loading",
                            250,
                            "Loading.",
                            250,
                            "Loading..",
                            250,
                            "Loading...",
                        ]}
                        deletionSpeed={10}
                        cursor={false}
                        repeat={Infinity}
                    />
                </div>
            )
        default:
            return (
                <div className="flex flex-col items-center gap-4">
                    <h1 className="font-bold text-5xl">Error!</h1>
                    <p className="text-gray-600 text-center pb-4">Something went wrong... Please start another game.</p>
                    <div className="w-full pt-8 border-t-2 border-t-gray-200">
                        <Link className="w-full" onClick={() => setUserScore(0)} href="/">
                            <motion.button
                                className="bg-white border-2 w-full text-3xl border-reddit-orange text-reddit-orange p-4 font-bold rounded-2xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.80 }}
                            >
                                Back home
                            </motion.button>
                        </Link>
                    </div>
                </div>
            )
    }
}
