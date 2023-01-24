export default function CardBody({ img, text }) {
    return (
        <div className="pt-4 flex flex-col gap-6">
            {img && <img src={img} />}
            {text && <p className="line-clamp-[8]">{text}</p>}
            {/* <button className="underline text-gray-600 self-end hover:text-gray-900 hover:no-underline">Read More +</button> */}
        </div>
    )
}
