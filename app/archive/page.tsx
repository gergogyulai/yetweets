import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Tweet } from "@/lib/types";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import findEra from "@/lib/era";
import { VAULT_URL } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

async function fetchTweets(): Promise<Tweet[]> {
  const res = await fetch(`${VAULT_URL}/master.json`);
  return res.json();
}

const InfoBar = ({ tweet }: { tweet: Tweet }) => {
  const mediaCount = tweet.extended_entities?.media?.length || 0;
  const mediaTypes = tweet.extended_entities?.media
    ? tweet.extended_entities.media.reduce(
        (acc, media) => {
          if (media?.type) {
            acc[media.type] = (acc[media.type] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>,
      )
    : {};

  const formatMediaText = (type: string, count: number) => {
    if (count === 1) return `${type}`;
    return `${type}s`;
  };

  return (
    <div className="flex gap-2">
      <Badge className="border-border bg-primary-foreground text-foreground">
        {tweet.favorite_count} Likes
      </Badge>
      <Badge className="border-border bg-primary-foreground text-foreground">
        {tweet.retweet_count} Retweets
      </Badge>
      {mediaCount > 0 && (
        <Badge className="border-border bg-primary-foreground text-foreground">
          {mediaCount} Media (
          {Object.entries(mediaTypes)
            .map(([type, count]) => formatMediaText(type, count))
            .join(", ")}
          )
        </Badge>
      )}
      {tweet.deleted && (
        <Badge className="border-destructive bg-primary-foreground text-foreground">
          Deleted
        </Badge>
      )}
    </div>
  );
};

function TweetCard({ tweet }: { tweet: Tweet }) {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString();
  const fullDateTime = new Date(tweet.created_at).toLocaleString();
  const kanyeEra = findEra(new Date(tweet.created_at));
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(", ") : kanyeEra;

  return (
    <Link
      href={`/archive/tweets/${tweet.id_str}`}
      prefetch={false}
      className="block w-full"
    >
      <Card className="mb-6 flex h-full flex-col justify-between transition-all ease-in-out hover:border-black dark:hover:border-white">
        <CardHeader className="flex w-full pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/pfp.jpg"
                alt="Kanye West"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold leading-none tracking-tight">
                  Kanye West
                </span>
                <span className="text-sm text-muted-foreground">
                  @kanyewest
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {tweet?.retweeted_status && (
                <Badge className="border-border bg-primary-foreground text-foreground">
                  Retweeted
                </Badge>
              )}
              {tweet.is_quote_status && (
                <Badge className="border-border bg-primary-foreground text-foreground">
                  Qoute Tweet
                </Badge>
              )}
              {tweet.in_reply_to_status_id_str && (
                <Badge className="border-border bg-primary-foreground text-foreground">
                  Reply
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-xl font-semibold leading-relaxed">
            {tweet.text}
          </div>
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-2">
          <div className="w-full">
            <InfoBar tweet={tweet} />
          </div>
          <div className="flex w-full items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm text-muted-foreground">
                    {formattedDate}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{fullDateTime}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm text-muted-foreground">{eraContent}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default async function ArchivePage() {
  const data = await fetchTweets();
  const sortedData = data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  // .slice(0, 10); // Limit to the first 10 items

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <main className="grid auto-rows-fr gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {sortedData.map((item: Tweet, index: number) => (
            <TweetCard key={index} tweet={item} />
          ))}
        </main>
      </div>
    </div>
  );
}
