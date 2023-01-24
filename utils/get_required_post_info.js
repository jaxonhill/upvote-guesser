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

    return postInfo;
}