import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Tweet } from "@/lib/types"
import { Card, CardFooter, CardHeader, CardContent } from "@/components/ui/card"
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "@/components/ui/tooltip"
import findEra from '@/lib/era'

async function fetchTweets(): Promise<Tweet[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/kanyewesst/ye-tweets/refs/heads/v1.0.0/output.json"
  )
  return res.json()
}

interface TweetCardProps {
  tweet: Tweet
}

function TweetCard({ tweet }: TweetCardProps) {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString()
  const fullDateTime = new Date(tweet.created_at).toLocaleString()
  const kanyeEra = findEra(new Date(tweet.created_at))
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(', ') : kanyeEra

  return (
    <Link href={`/archive/tweets/${tweet.id_str}`} className="block w-full">
      <Card className="mb-6 flex flex-col h-full justify-between">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-4">
            <Image
              src="/pfp.jpg"
              alt="Kanye West"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-semibold leading-none tracking-tight">Kanye West</span>
              <span className="text-sm text-muted-foreground">@kanyewest</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-xl font-semibold leading-relaxed">{tweet.text}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm text-muted-foreground">{formattedDate}</span>
              </TooltipTrigger>
              <TooltipContent>
                {fullDateTime}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm text-muted-foreground">{eraContent}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default async function ArchivePage() {
  const data = await fetchTweets()
  const sortedData = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  return(
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">  
        <main className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 auto-rows-fr"> 
          {sortedData.map((item: Tweet, index: number) => (
            <TweetCard key={index} tweet={item} />
          ))}
        </main>
      </div>
    </div>
  )
}