import Link from "next/link"
import { Tweet } from "@/lib/types"
import { getKanyeEra } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "@/components/ui/tooltip"
import Navbar from "@/components/navbar"

async function fetchTweets(): Promise<Tweet[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/kanyewesst/ye-tweets/refs/heads/v1.0.0/output.json"
  )
  return res.json()
}

const TweetCard = ({ tweet }: { tweet: Tweet }) => {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString()

  return (
    <Link href={`/tweets/${tweet.id_str}`} className="flex">
      <Card className="mb-6 w-full">
        <div className="p-6 bg-card">
          <div className="flex justify-between items-start mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-sm text-muted-foreground">{formattedDate}</span>
                </TooltipTrigger>
                <TooltipContent>
                  {new Date(tweet.created_at).toLocaleString()}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm text-muted-foreground">{getKanyeEra(new Date(tweet.created_at))}</span>
          </div>
          <p className="text-xl font-semibold leading-relaxed">{tweet.text}</p>
        </div>
      </Card>
    </Link>
  )
}

export default async function Home() {
  const data = await fetchTweets()
  const sortedData = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ye Tweets</h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-muted-foreground mb-2">
              A comprehensive archive of tweets by Kanye West
            </p>
            <p className="text-sm text-muted-foreground">
              Data sources: archive.org and THE spreadsheet
            </p>
          </div>
        </header>

        <Navbar />

        <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedData.map((item: Tweet, index: number) => (
            <TweetCard key={index} tweet={item} />
          ))}
        </main>
      </div>
    </div>
  )
}