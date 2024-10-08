import Link from 'next/link'

export default function Highlights() {
    return (
        <div className="flex flex-col items-center p-4 lowercase">
            <div>Work in progress</div>
            <div>curating iconic ye tweets...</div>
            <Link href="/" className="underline">
                go to index
            </Link>
        </div>
    )
}