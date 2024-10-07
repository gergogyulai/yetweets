import type { Metadata } from "next";
import { geistSans, geistMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

export const metadata: Metadata = {
  title: "Ye Tweets",
  metadataBase: new URL("https://ye-tweets.app"),
  description: "A more or less complete archive of every tweet ever published by Kanye West",
  keywords: ["kanye", "west", "tweets"],
  openGraph: {
    title: "Ye Tweets",
    description: "A more or less complete archive of every tweet ever published by Kanye West",
    type: "website",
    url: "https://ye-tweets.vercel.app",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
