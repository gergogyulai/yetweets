import Link from "next/link";
import { MinimalTweet } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import FeaturedTweetCard from "@/components/featured-tweet";
import TwitterArchiveStats from "@/components/tweet-archive-stats";

const featuredTweets: MinimalTweet[] = [
  {
    created_at: "Fri Jul 27 21:12:18 +0000 2018",
    id_str: "1022952843563556864",
    text: "How to NOT kill yourself pt 1\n\nAvoid being around people who make you want to kill yourself",
  },
  {
    created_at: "Thu Jun 14 12:33:51 +0000 2018",
    id_str: "1007239693291773952",
    text: "your pride can be and will be used against you",
  },
  {
    created_at: "Thu Apr 26 17:20:53 +0000 2018",
    id_str: "989554923074240512",
    text: "my friend said he texted all his friends this morning and said I love you",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-sm font-medium text-muted-foreground">
            🔄 We are working on archiving his latest tweeting spree, latest tweets are coming soon!
          </p>
        </div>
      </div>
      <main className="grow">
        <section className="relative bg-primary/5 py-24 md:py-32" id="hero">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Ye Tweets Archive
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
              A comprehensive archive of Kanye West's tweets, spanning his entire Twitter history up until 2023.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/archive" passHref>
                <Button size="lg" className="w-full text-lg sm:w-auto">
                  Browse Archive
                </Button>
              </Link>
              <Link href="/archive/highlights" passHref>
                <Button size="lg" variant="outline" className="w-full text-lg sm:w-auto">
                  View Highlights
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24" id="statistics">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-2xl font-semibold sm:text-3xl">
              Archive Statistics
            </h2>
            <TwitterArchiveStats />
          </div>
        </section>

        <section className="border-y bg-muted/50 py-16 md:py-24" id="featured-highlighted">
          <div className="container mx-auto px-4">
            <Link href="/archive/highlights" className="group" passHref>
              <h2 className="mb-10 text-center text-2xl font-semibold transition-colors hover:text-primary sm:text-3xl">
                Featured Tweets
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </h2>
            </Link>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTweets.map((tweet) => (
                <FeaturedTweetCard key={tweet.id_str} tweet={tweet} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24" id="about">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">About the Project</h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              The Ye Tweets Archive is an effort to preserve Kanye West's Twitter history.
              Our data comes from reliable sources including{" "}
              <Link className="underline decoration-primary decoration-2 hover:text-primary" href="https://archive.org/">
                archive.org
              </Link>
              ,{" "}
              <Link className="underline decoration-primary decoration-2 hover:text-primary" href="https://polititweet.org">
                polititweet.org
              </Link>, directly from twitter, and community-maintained spreadsheets.
            </p>
          </div>
        </section>

        <section className="border-t bg-muted/50 py-16 md:py-24" id="contribute">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">
              Contribute to the Archive
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
              Although this project is currently maintained by a solo developer,
              your contributions are welcome! Help us grow the Ye Tweets Archive.
            </p>
            <Link
              href="https://github.com/yetweets"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="group text-lg">
                <GithubIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto space-y-2 px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ye Tweets Archive</p>
          <p>This project is for educational and archival purposes only.</p>
          <p>All tweets and media are property of the indicated original authors.</p>
        </div>
      </footer>
    </div>
  );
}
