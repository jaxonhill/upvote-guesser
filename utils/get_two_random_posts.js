import { fetch_valid_posts } from "./fetch_valid_posts";
import { get_required_post_info } from "./get_required_post_info";

export const get_two_random_posts = async () => {
    let firstPost;
    let secondPost;

    // Loop until we have two unique posts.
    while (true) {
        // Make two valid post arrays that have random subreddits
        const firstPostOptions = await fetch_valid_posts();
        const secondPostOptions = await fetch_valid_posts();

        // Make a random choice of which post to use for each
        const firstPostSelection = firstPostOptions[Math.floor(Math.random() * firstPostOptions.length)];
        const secondPostSelection = secondPostOptions[Math.floor(Math.random() * secondPostOptions.length)];

        // Get only the info you need from each post
        firstPost = get_required_post_info(firstPostSelection);
        secondPost = get_required_post_info(secondPostSelection);

        // If the information is valid: (the choies aren't the same and have different num of upvotes)
        // then break out of the loop and return the posts.
        if ((firstPost.id !== secondPost.id) && (firstPost.upvotes !== secondPost.upvotes)) {
            break;
        }
    }

    // Return the unique posts
    return {
        first: firstPost,
        second: secondPost,
    }
}