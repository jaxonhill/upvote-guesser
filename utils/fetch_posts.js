export async function fetchPosts() {
    const res = await fetch("https://www.reddit.com/r/csmajors/top.json");
    const data = await res.json();

    return data["data"]["children"]
}