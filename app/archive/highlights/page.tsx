import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tweet } from "@/lib/types";
import { VAULT_URL } from "@/lib/utils";
import Profile from "@/components/profile-picture";
import TweetRendererV2 from "@/components/tweet-renderer";
import InfoBar from "@/components/info-bar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote/rsc";

interface HighlightedTweet {
  tweet: Tweet;
  context: {
    title: string;
    content: string;
  };
}

// This will be replaced with actual data fetching
async function fetchHighlightedTweets(): Promise<HighlightedTweet[]> {
  const res = await fetch(`${VAULT_URL}/master.json`);
  const tweets: Tweet[] = await res.json();
  
  // Mock data for now - this will be replaced with actual context data
  return tweets.slice(0, 5).map(tweet => ({
    tweet,
    context: {
      title: "Historical Context",
      content: "This tweet represents a significant moment in Kanye's social media presence. It showcases his unique approach to communication and his influence on popular culture."
    }
  }));
}

export default async function Highlights() {
  const highlightedTweets = await fetchHighlightedTweets();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Highlighted Tweets</h1>
        <p className="mt-2 text-muted-foreground">
          A curated collection of significant tweets with historical context
        </p>
      </div>
      
      <div className="space-y-12">
        {highlightedTweets.map((highlight, index) => (
          <div key={highlight.tweet.id_str}>
            <Card className="overflow-hidden">
              <div className={cn(
                "grid grid-cols-1 md:grid-cols-2",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                {/* Tweet Section */}
                <div className="p-6">
                  <CardHeader className="px-0">
                    <Profile tweet={highlight.tweet} />
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="mb-4">
                      <TweetRendererV2 
                        tweet={highlight.tweet}
                        renderMedia={true}
                        renderLinkPreviews={true}
                      />
                    </div>
                    <InfoBar tweet={highlight.tweet} />
                  </CardContent>
                </div>

                {/* Separator for mobile */}
                <div className="md:hidden">
                  <Separator />
                </div>

                {/* Context Section */}
                <div className="border-muted bg-muted/5 p-6 md:border-l">
                  <CardHeader className="px-0">
                    <CardTitle className="text-xl">
                      {highlight.context.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert px-0">
                    <MDXRemote source={highlight.context.content} />
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

