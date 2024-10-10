import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/navbar";
import localFont from "next/font/local";

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono", 
});

export const metadata: Metadata = {
  title: "Ye Tweets",
  metadataBase: new URL("https://yetweets.xyz/"),
  description: "A comprehensive archive of Kanye West's tweets, spanning his entire Twitter history up until 2023.",
  keywords: ["kanye", "west", "tweets", "archive", "ye", "yeezy", "kanye west", "kanye west tweets", "kanye tweets", "kanye west twitter", "kanye twitter", "kanye west twitter archive", "kanye west tweets archive", "kanye west twitter history", "kanye west tweets history", "kanye west twitter archive", "kanye west tweets archive", "kanye west twitter history", "kanye west tweets history"],
  openGraph: {
    title: "Ye Tweets",
    description: "A comprehensive archive of Kanye West's tweets, spanning his entire Twitter history up until 2023.",
    type: "website",
    url: new URL("https://yetweets.xyz/"),
    images: [
      {
        url: "/og.png",
        width: 1280,
        height: 720,
        alt: "Ye Tweets",
      }
    ],
  },  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics/>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="97b17576-ce12-424b-ac74-500b36ea5bb8"></script>
      </head>
      <link rel="icon" href="https://fav.farm/%F0%9F%92%BD" sizes="any" />
      <body className={`${geistMono.variable}`}>
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
