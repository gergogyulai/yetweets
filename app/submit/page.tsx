import Link from "next/link";

export default function Submit() {
    return (
        <div className="flex flex-col items-center p-4 lowercase">
            <div>Work in progress</div>
            <div>We are working on a feature that allows you to submit tweets.</div>
            <Link href="/" className="underline">
                go to index
            </Link>
        </div>
    )
}