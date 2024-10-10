import Link from 'next/link'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Highlights | Ye Tweets",
  openGraph: {
    title: "Highlights | Ye Tweets",
    images: [
      {
        url: "/og-highligths.png",
        width: 1280,
        height: 720,
        alt: "Ye Tweets",
      }
    ]
  }
};

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