import CardBody from "./CardBody"
import CardHeading from "./CardHeading"

export default function PostCard() {
    return (
        <article className="bg-white rounded-2xl shadow p-4">
            <CardHeading />
            <CardBody />
        </article>
    )
}
