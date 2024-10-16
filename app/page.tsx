import Link from "next/link"
import { MinimalTweet } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import findEra from "@/lib/era"
import FeaturedTweets from "@/components/featured-tweet"
import { cn } from "@/lib/utils"

const featuredTweets: MinimalTweet[] = [
  { 
    created_at: "Fri Jul 27 21:12:18 +0000 2018",
    id_str: "1022952843563556864",
    text: "How to NOT kill yourself pt 1\n\nAvoid being around people who make you want to kill yourself"
  },
  {
    created_at: "Thu Jun 14 12:33:51 +0000 2018",
    id_str: "1007239693291773952",
    text: "your pride can be and will be used against you"
  },
  {
    created_at: "Thu Apr 26 17:20:53 +0000 2018",
    id_str: "989554923074240512",
    text: "my friend said he texted all his friends this morning and said I love you",
  }

]

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Ye Tweets Archive</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              {"A comprehensive archive of Kanye West's tweets, spanning his entire Twitter history up until 2023."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/archive" passHref>
                <Button size="lg" className="text-lg">Browse Archive</Button>
              </Link>
              <Link href="/highlights" passHref>
                <Button size="lg" variant="outline" className="text-lg">View Highlights</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Link href="/highlights" passHref>
              <h2 className="text-3xl font-semibold mb-8 text-center">Highlighted Tweets</h2>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTweets.map((tweet) => (
                <FeaturedTweets key={tweet.id_str} tweet={tweet} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Contribute to the Archive
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Although this project is currently maintained by a solo developer, your contributions are welcome! Help us grow the Ye Tweets Archive.
            </p>
            <Link href="https://github.com/gergogyulai/yetweets" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-lg">
                <GithubIcon className="mr-2 h-5 w-5" />
                Contribute on GitHub
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">About the Project</h2>
            <p className="text-xl max-w-2xl mx-auto">
              {"The Ye Tweets Archive is an effort to preserve Kanye West's Twitter history. "}
              Our data comes from reliable sources including <Link className="underline" href={"https://archive.org/"}>archive.org</Link>, <Link className="underline" href={"https://polititweet.org"}>polititweet.org</Link>, and community-maintained spreadsheets.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">Known Issues and Limitations</h2>
        <p className="text-xl max-w-3xl mx-auto text-center mb-12">
          The Ye Tweets Archive is an ongoing project, and we strive for accuracy and completeness. However, there are some known issues and limitations that users should be aware of:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Known Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Some tweets may be missing due to incomplete data sources.</li>
                <li>Some mass archived tweets may be malformed or contain errors. We are working to correct these issues manually.</li>
                <li>Retweets and replies may not always be accurately labeled.</li>
                <li>Not all media attachments are archived.</li>
                <li>Some of the tweet metadata (e.g., likes, retweets) is missing.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Context for some tweets may be lost due to the nature of archiving.</li>
                <li>The archive may not capture all deleted tweets.</li>
                <li>Some tweets may be truncated or contain broken links.</li>
                <li>
                  Videos and other non-image media is not supported in the archive. Due to the nature of the data sources, we are unable to provide video content.
                </li>
                <li>The JSON schema may not always be consistent across all tweets. This may result in missing or incorrect data.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8">
            <CardHeader>
              <CardTitle>Upcoming updates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improved media support for tweets with images.</li>
                <li>Enhanced metadata for tweets, including likes and retweets.</li>
                <li>Improved error handling and data validation.</li>
                <li>Search functionality to help users find specific tweets or topics, eras.</li>
                <li>Better support for external links, including previews and metadata</li>
                <li>Replace the current JSON data source with a more reliable and up-to-date solution.</li>
              </ul>
            </CardContent>
          </Card>
        <div className="mt-12 text-center">
          <p className="text-lg mb-4">
            We're continuously working to improve the archive and address these issues. Your feedback and contributions are valuable in this process.
          </p>
          <Link href="https://github.com/gergogyulai/yetweets" target="_blank">
            <Button variant="outline" size="lg">
              Report an Issue or Suggest Improvements
            </Button>
          </Link>
        </div>
      </div>
    </section>

      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Ye Tweets Archive</p>
          <p className="mt-2 text-sm text-muted-foreground">This project is for educational and archival purposes only.</p>
        </div>
      </footer>
    </div>
  )
}