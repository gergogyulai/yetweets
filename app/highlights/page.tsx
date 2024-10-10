import Link from 'next/link'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Highlights | Ye Tweets",
  metadataBase: new URL("https://yetweets.xyz"),
  description: "A More or Less Complete Archive of Every Tweet Ever Published by Kanye West",
  keywords: ["kanye", "west", "tweets", "archive", "ye", "yeezy", "kanye west"],
  openGraph: {
    title: "Highlights | Ye Tweets",
    description: "A More or Less Complete Archive of Every Tweet Ever Published by Kanye West",
    type: "website",
    url: "https://yetweets.xyz",
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