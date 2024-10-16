import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import findEra from "@/lib/era"
import { Tweet } from "@/lib/types"
import Share from "@/components/share"
import Link from "next/link"
import { detectRetweet, gracefullyTruncate, hasTcoLink, removeRetweetString, removeTcoLink } from "@/lib/utils"
import MissingMedia from "@/components/missing-media-badge"
import TweetRenderer from "@/components/tweet-renderer"
import { Badge } from "@/components/ui/badge"
import MediaRenderer from "@/components/image-renderer"
import LinkPreview from "@/components/link-preview"
import {VAULT_URL} from "@/lib/utils"

async function getData(id: string): Promise<Tweet | null> {
  try {
    const res = await fetch(`${VAULT_URL}/tweets/${id}.json`, { next: { revalidate: 86400 }}) 
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error("Failed to fetch tweet:", error)
    return null
  }
}

export async function generateMetadata({ params: { id } }: { params: { id: string }}): Promise<Metadata> {
  return {
    title: `Tweet: ${id} | Ye Tweets`,
    description: `View a Tweet by Kanye West`,
    openGraph: {
      title: `Tweet ${id} | Ye Tweets`,
      description: `View a Tweet by Kanye West on the Ye Tweets Archive`,
      images: [
        { url: `/og.png`, width: 1280, height: 720, alt: `Tweet ${id} | Ye Tweets` }
      ],
      siteName: `Ye Tweets`,
      url: `https://yetweets.xyz/archive/tweets/${id}`
    }
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const tweet = await getData(params.id)
  if (!tweet) notFound()

  const formattedDate = new Date(tweet.created_at).toLocaleString()
  const kanyeEra = findEra(new Date(tweet.created_at))
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(', ') : kanyeEra
  const isRetweet = detectRetweet(tweet.text)

  return (
    <div className="flex flex-col items-center justify-between p-4">
        <Card className="w-full max-w-xl bg-card text-card-foreground shadow">
            <CardContent className="flex flex-col p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/pfp.jpg"
                      alt="Kanye West"
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                      <div className="flex flex-col mt-[2px]">
                        <span className="font-semibold leading-none tracking-tight">Kanye West</span>
                        <span className="text-sm text-muted-foreground">@kanyewest</span>
                      </div>
                  </div>
                  <div className="-mt-[8px] flex gap-2 select-none">
                    <MissingMedia hasMissingMedia={!!tweet.entities?.media} />
                    {isRetweet &&
                      <Badge>
                        Retweet
                      </Badge>
                    }
                  </div>
                </div>
                <div className="text-xl font-semibold leading-relaxed mb-4">
                  <TweetRenderer tweet={tweet.text} entities={tweet.entities} />
                  {tweet.entities && tweet.entities.media && tweet.entities.media.length > 0 && (
                    <MediaRenderer media={tweet.entities.media} />
                  )}
                  {tweet.entities && tweet.entities.urls.length > 0 && !tweet.entities.media && !tweet.entities.urls[0].expanded_url.includes("https://twitter.com/i/web") && (
                    <LinkPreview url={tweet.entities?.urls[0].expanded_url}/>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{formattedDate}</span>
                    <span>{eraContent}</span>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Share shareUrl={`https://yetweets.xyz/archive/tweets/${params.id}`} />
            </CardFooter>
        </Card>
        <div className="flex gap-4 mt-4">
            <Link href="/archive">
                <Button asChild size="lg" variant={"secondary"}>
                    <span>Return to Archive</span>
                </Button>
            </Link>
            <Link href={`https://raw.githubusercontent.com/kanyewesst/ye-tweets/main/data/${params.id}.json`} target="_blank">
                <Button asChild size="lg" variant={"outline"}>
                    <span>
                        View Raw JSON
                    </span>
                </Button>
            </Link>
        </div>
    </div>
  )
}