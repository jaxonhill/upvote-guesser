import { fetchPosts } from "./fetch_posts";
import { does_post_meet_conditions } from "./does_post_meet_conditions";

export const fetch_valid_posts = async () => {
    let validPosts = [];

    // Fetch validPosts until we have at least 1 in the array
    while (validPosts.length <= 0) {
        const fetchedPosts = await fetchPosts();
        validPosts = fetchedPosts.filter(post => does_post_meet_conditions(post));
    }

    // If we are here, we have at least 1 valid post in the array
    return validPosts;
}