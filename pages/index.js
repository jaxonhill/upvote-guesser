// QUICK NOTE:
// The "url_overridden_by_dest either has a url that starts with i or v depending on if it is an image or video"

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div className="flex flex-col items-center gap-8">
      {posts.map((post) => {
        const hasImageOrVideo = post["data"].hasOwnProperty("url_overridden_by_dest");

        // If there is media, we need to display it
        if (hasImageOrVideo) {
          const mediaURL = post["data"]["url_overridden_by_dest"]
          // Go to index 8 of the URL because this is right after the https://
          // the letter in index 8 is either "i" for image or "v" for video 
          const mediaType = mediaURL[8]

          // If it is an image
          if (mediaType === "i") {
            return (
              <img src={post["data"]["url_overridden_by_dest"]}></img>
            )
          } else {  // It is a video, TODO: This doesn't work right now. Videos aren't possible for a good mobile and web experience.
            return (
              <video controls>
                <source src={post["data"]["url_overridden_by_dest"]} type="video/mp4" />
              </video>
            )
          }
        }

        // Otherwise, don't worry about media and just return text
        else {
          return (
            <p>Nothing</p>
          )
        }
      })}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch("https://www.reddit.com/r/IdiotsInCars/top.json");
  const data = await res.json();

  return {
    props: {
      posts: data["data"]["children"]
    }
  }
}