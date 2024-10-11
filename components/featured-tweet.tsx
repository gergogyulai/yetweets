import React from 'react'
import Link from 'next/link'
import { MinimalTweet } from "@/lib/types"
import { Tweet } from "@/lib/types"
import findEra from '@/lib/era'
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "@/components/ui/tooltip"
import { Card } from "@/components/ui/card"
import TweetRenderer from '@/components/tweet-renderer'

const FeaturedTweets = ({tweet} : {tweet: MinimalTweet}) => {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString()
  const fullDateTime = new Date(tweet.created_at).toLocaleString()
  const kanyeEra = findEra(new Date(tweet.created_at))
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(', ') : kanyeEra

  return (
    <Link href={`/archive/tweets/${tweet.id_str}`} key={tweet.id_str} className="flex" prefetch={false}>
      <Card className=" flex flex-col justify-between p-6 hover:shadow-lg transition-shadow w-full">
        <div className="text-lg mb-4">
          <TweetRenderer tweet={tweet.text} />
        </div>
        <div className='flex justify-between text-sm text-muted-foreground'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span>{formattedDate}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Date: {fullDateTime}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span>{eraContent}</span>
        </div>
      </Card>
    </Link>
  )
}

export default FeaturedTweets