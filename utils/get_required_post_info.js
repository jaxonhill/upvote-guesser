export const get_required_post_info = (post) => {
    let postInfo = {
        id: post["data"]["id"],
        subreddit: post["data"]["subreddit"],
        title: post["data"]["title"],
        upvotes: Number(post["data"]["ups"]),
    };

    // Set image to null or the image link depending on if it has one
    if (post["data"].hasOwnProperty("url_overridden_by_dest")) {
        postInfo["image"] = post["data"]["url_overridden_by_dest"];
    } else {
        postInfo["image"] = null;
    }

    // Set text to null or the text of the post depending on if there is a text section
    if (post["data"].hasOwnProperty("selftext_html")) {
        if (post["data"]["selftext_html"] === "" || !post["data"]["selftext_html"]) {     // If empty string or null
            postInfo["text"] = null;
        } else {
            postInfo["text"] = post["data"]["selftext_html"]
        }
    } else {
        postInfo["text"] = null;
    }

    return postInfo;
}