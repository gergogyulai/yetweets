import ScrollToTop from "@/components/scroll-to-top";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Archive | Ye Tweets",
  metadataBase: new URL("https://yetweets.xyz"),
  description: "A More or Less Complete Archive of Every Tweet Ever Published by Kanye West",
  keywords: ["kanye", "west", "tweets", "archive", "ye", "yeezy", "kanye west"],
  openGraph: {
    title: "Archive | Ye Tweets",
    description: "A More or Less Complete Archive of Every Tweet Ever Published by Kanye West",
    type: "website",
    url: "https://yetweets.xyz",
    images: [
      {
        url: "/og-archive.png",
        width: 1280,
        height: 720,
        alt: "Ye Tweets",
      }
    ]
  }
};

export default function ArchiveLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <ScrollToTop />
            {children}
        </>
    )
}