import Image from "next/image";
import { Tweet } from "@/lib/types";
import Search from "@/components/search";
import { getKanyeEra } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {  } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "@/components/ui/tooltip";

async function fetchTweets(): Promise<Tweet[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/kanyewesst/ye-tweets/refs/heads/v1.0.0/output.json",
  );
  return res.json();
}

const TweetCard = ( { tweet } : { tweet : Tweet } ) => {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString();

  return (
    <Card className="mb-8 overflow-hidden w-[600px]">
      <div className="p-6 bg-stone-100">
        <div className="flex justify-between items-start mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="font-mono text-xs text-stone-500">{formattedDate}</span>
              </TooltipTrigger>
              <TooltipContent>
                {new Date(tweet.created_at).toLocaleString()}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-mono text-xs text-stone-500">{getKanyeEra(new Date(tweet.created_at))}</span>
        </div>
        <p className="text-2xl font-bold font-mono text-black">{tweet.text}</p>
      </div>
    </Card>
  );
}


export default async function Home() {
  const data = await fetchTweets();
  const sortedData = data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-mono text-5xl font-bold">
          Ye Tweets
        </h1>
        <div>
          <p>A more or less complete archive of every tweet ever published by Kanye West</p>
          <p>Data from: archive.org, and THE spreadsheet</p>
        </div>
      </div>
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        {sortedData.map((item: Tweet, index: number) => (
          <TweetCard key={index} tweet={item} />
        ))}
      </main>
    </div>
  );
}