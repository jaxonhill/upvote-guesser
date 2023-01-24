import { fetch_valid_posts } from "./fetch_valid_posts";
import { get_required_post_info } from "./get_required_post_info";

export const get_two_random_posts = async () => {
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
    const firstPost = get_required_post_info(firstPostSelection);
    const secondPost = get_required_post_info(secondPostSelection);

    return {
        first: firstPost,
        second: secondPost,
    }
}