import React from "react";
import Link from "next/link";
import { MinimalTweet } from "@/lib/types";
import findEra from "@/lib/era";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import TweetRendererV1 from "@/components/tweet-rendererv1";

const FeaturedTweetCard = ({ tweet }: { tweet: MinimalTweet }) => {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString();
  const fullDateTime = new Date(tweet.created_at).toLocaleString();
  const kanyeEra = findEra(new Date(tweet.created_at));
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(", ") : kanyeEra;

  return (
    <Link
      href={`/archive/tweets/${tweet.id_str}`}
      key={tweet.id_str}
      className="flex"
      prefetch={false}
    >
      <Card className="flex w-full flex-col justify-between p-6 transition-shadow hover:shadow-lg">
        <div className="mb-4 text-lg">
          <TweetRendererV1 tweet={tweet.text} />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
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
  );
};

export default FeaturedTweetCard;
