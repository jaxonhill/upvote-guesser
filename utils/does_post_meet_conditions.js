export function does_post_meet_conditions(post) {
    // Check we have basic properties we need, so we can index without worry
    if (
        post["data"].hasOwnProperty("ups")
        && post["data"].hasOwnProperty("title")
        && post["data"].hasOwnProperty("subreddit")
        && post["data"].hasOwnProperty("over_18")
    ) {
        // If the post is NSFW - return false, we don't want these | over_18 is either true or false in JSON
        if (post["data"]["over_18"]) {
            return false;
        }

        // If the post has a url to something that isn't an image - return false
        if (post["data"]["url_overridden_by_dest"]) {
            if ((post["data"]["url_overridden_by_dest"][8]) !== "i")
                return false;
        }

        // If here, the post meets conditions.
        return true;

    } else {
        return false;
    }
}