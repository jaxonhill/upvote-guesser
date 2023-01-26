
// className="line-clamp-[8]"

export default function CardBody({ img, text }) {
    return (
        // TODO: Need to use Javascript here to figure out how many characters the text is,
        // then if it is above a certain threshhold, truncate it and show a Show More button.

        // TODO: For the text section, use remark to parse the markdown and turn it into HTML, use
        // tailwind @apply (look at video) (https://www.youtube.com/watch?v=J0Wy359NJPM)
        // TODO: ACTUALLY Might just want to use selftext_html instead and then apply tailwind styles
        // TODO: Disable links (https://codewithhugo.com/disable-html-anchor/)

        <div className={`max-w-full flex flex-col gap-6 ${(img || text) ? "border-t border-t-gray-200 mt-4 pt-4" : ""}`}>
            {img && <img src={img} />}
            {text && <p className="line-clamp-[8]">{text}</p>}
            {/* <button className="underline text-gray-600 self-end hover:text-gray-900 hover:no-underline">Read More +</button> */}
        </div>
    )
}
