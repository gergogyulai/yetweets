import type { Metadata } from "next";
import { geistSans, geistMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Ye Tweets",
  metadataBase: new URL("https://yetweets.xyz"),
  description: "A More or Less Complete Archive of Every Tweet Ever Published by Kanye West",
  keywords: ["kanye", "west", "tweets", "archive", "ye", "yeezy", "kanye west"],
  openGraph: {
    title: "Ye Tweets",
    description: "A More or Less Complete Archive of Every Tweet Ever Published by Kanye West",
    type: "website",
    url: "https://yetweets.xyz",
    images: [
      {
        url: "/og.png",
        width: 1280,
        height: 720,
        alt: "Ye Tweets",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics/>
      {/* <script defer src="https://cloud.umami.is/script.js" data-website-id="97b17576-ce12-424b-ac74-500b36ea5bb8"></script> */}
      <link rel="icon" href="https://fav.farm/%F0%9F%92%BD" sizes="any" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col items-center font-mono">
            <div className="w-full">
              <div className="flex-grow">
                <Navbar />
                <div>{children}</div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
