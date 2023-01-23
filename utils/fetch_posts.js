import { SUBREDDITS_LIST } from "./subreddits_list";

export async function fetchPosts() {
    const randomSubreddit = getRandomSubreddit();
    const randomSortingExtension = getRandomSortingExtension();
    const finalFetchURL = `https://www.reddit.com/r/${randomSubreddit}/${randomSortingExtension}`;

    console.log(finalFetchURL);

    const res = await fetch(finalFetchURL);
    const data = await res.json();

    return data["data"]["children"]
}

function getRandomSortingExtension() {
    const BASELINE_CHOICES = ["hot", "top"];
    const TOP_CHOICES = ["?t=day", "?t=week", "?t=month", "?t=year", "?t=all"];
    let final_extension = "";

    const hot_or_top = BASELINE_CHOICES[Math.floor(Math.random() * BASELINE_CHOICES.length)];

    // Add extra extension for top choice
    if (hot_or_top === "top") {
        final_extension = TOP_CHOICES[Math.floor(Math.random() * TOP_CHOICES.length)];
    }

    return `${hot_or_top}/.json${final_extension}`
}

function getRandomSubreddit() {
    return SUBREDDITS_LIST[Math.floor(Math.random() * SUBREDDITS_LIST.length)];
}