import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Script from "next/script";
import { Geist_Mono } from "next/font/google";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ye Tweets Archive",
  metadataBase: new URL("https://yetweets.xyz/"),
  description: "A comprehensive archive of Kanye West's tweets, spanning his entire Twitter history up until 2023. Search, explore, and discover Ye's most memorable tweets and social media moments.",
  keywords: [
    "kanye west",
    "ye",
    "tweets",
    "twitter archive",
    "yeezy",
    "social media history",
    "tweet collection",
    "kanye quotes",
    "ye tweets",
    "hip hop history",
    "twitter history"
  ],
  publisher: "yetweets.xyz",
  applicationName: "Ye Tweets Archive",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "https://yetweets.xyz"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Ye Tweets Archive",
    description: "A comprehensive archive of Kanye West's tweets, spanning his entire Twitter history up until 2023. Search, explore, and discover Ye's most memorable tweets and social media moments.",
    type: "website",
    url: "https://yetweets.xyz/",
    siteName: "Ye Tweets Archive",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1280,
        height: 720,
        alt: "Ye Tweets Archive - Comprehensive collection of Kanye West's tweets",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ye Tweets Archive",
    description: "Explore Kanye West's complete Twitter history up until 2023",
    images: ["/og.png"],
    site: "@yetweets",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <Script defer src="https://cloud.umami.is/script.js" data-website-id="97b17576-ce12-424b-ac74-500b36ea5bb8"/>
      <link rel="icon" href="https://fav.farm/%F0%9F%92%BD" sizes="any" />
      <body className={`${geistMono.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <div className="flex flex-col items-center font-mono">
            <div className="w-full">
              <div className="grow">
                <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                      <Link href="/" className="text-2xl font-bold hover:opacity-80 transition-opacity">
                        Ye Tweets
                      </Link>
                      
                      {/* Desktop Navigation */}
                      <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="gap-2">
                          <NavigationMenuItem>
                            <Link href="/archive" legacyBehavior passHref>
                              <NavigationMenuLink className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50 inline-flex items-center justify-center">
                                Archive
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <Link href="/#statistics" legacyBehavior passHref>
                              <NavigationMenuLink className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50 inline-flex items-center justify-center">
                                Stats
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <Link href="/highlights" legacyBehavior passHref>
                              <NavigationMenuLink className="px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50 inline-flex items-center justify-center">
                                Highlights
                              </NavigationMenuLink>
                            </Link>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <ModeToggle />
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>

                      {/* Mobile Navigation */}
                      <div className="flex items-center gap-2 md:hidden">
                        <ModeToggle />
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                              <Menu className="h-5 w-5" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                          <SheetTitle>Yetweets</SheetTitle>
                            <nav className="flex flex-col gap-4 mt-4">
                              <Link 
                                href="/archive"
                                className="py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                              >
                                Archive
                              </Link>
                              <Link 
                                href="/#statistics"
                                className="py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                              >
                                Stats
                              </Link>
                              <Link 
                                href="/highlights"
                                className="py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                              >
                                Highlights
                              </Link>
                            </nav>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </div>
                </header>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
