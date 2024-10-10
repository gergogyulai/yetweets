import ScrollToTop from "@/components/scroll-to-top";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Archive | Ye Tweets",
  openGraph: {
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