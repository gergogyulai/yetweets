import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import findEra from "@/lib/era";
import { Tweet } from "@/lib/types";
import Share from "@/components/share";
import Link from "next/link";
import {
  detectRetweet,
  extractMediaInfentifierFromUrl,
  getMediaUrl,
  gracefullyTruncate,
  removeTcoLink,
} from "@/lib/utils";
import MissingMedia from "@/components/missing-media-badge";
import TweetRenderer from "@/components/tweet-renderer";
import { Badge } from "@/components/ui/badge";
import MediaRenderer from "@/components/image-renderer";
import LinkPreview from "@/components/link-preview";
import { VAULT_URL } from "@/lib/utils";

async function getData(id: string): Promise<Tweet | null> {
  try {
    const res = await fetch(`${VAULT_URL}/tweets/${id}.json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch tweet:", error);
    return null;
  }
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const tweet = await getData(id);

  if (!tweet) {
    return {
      title: "Tweet not found | Ye Tweets Archive",
      description:
        "This tweet could not be found. It either does not exist or has not been archived yet.",
      openGraph: {
        title: "Tweet not found | Ye Tweets Archive",
        description:
          "This tweet could not be found. It either does not exist or has not been archived yet.",
        siteName: "Ye Tweets Archive",
        url: `https://yetweets.xyz/archive/tweets/${id}`,
        images: [
          {
            url: `/og.png`,
            width: 1280,
            height: 720,
            alt: `Tweet ${id} | Ye Tweets Archive`,
          },
        ],
      },
      twitter: {
        card: "summary",
        title: "Tweet not found | Ye Tweets Archive",
        description:
          "This tweet could not be found. It either does not exist or has not been archived yet.",
        images: ["/og.png"],
      },
    };
  }

  const tweetText = removeTcoLink(tweet.text) || "View this archived Tweet";
  const tweetAuthor = "ye";
  const tweetCreationDate = tweet?.created_at
    ? new Date(tweet.created_at).toLocaleString("en-US", { timeZone: "UTC" })
    : "Unknown date";
  const media = tweet?.extended_entities?.media?.[0];
  const isVideo = media?.type === "video";
  const isPhoto = media?.type === "photo";
  const tweetMedia = isPhoto
    ? getMediaUrl(extractMediaInfentifierFromUrl(media?.media_url_https))
    : null;
  const tweetMediaAltText = isPhoto
    ? `Archived image from tweet by ${tweetAuthor}`
    : "Archived media from tweet";
  const fallbackImage = "/og.png";
  const imageForMetadata = tweetMedia || fallbackImage;

  return {
    title: `Archived Tweet by ${tweetAuthor}: "${gracefullyTruncate(
      tweetText
    )}" | Ye Tweets Archive`,
    description: `Archived Tweet from ${tweetAuthor} posted on ${tweetCreationDate}: "${tweetText}"`,
    openGraph: {
      title: `Archived Tweet by ${tweetAuthor}: "${gracefullyTruncate(
        tweetText
      )}"`,
      description: `View this archived Tweet from ${tweetAuthor}, originally posted on ${tweetCreationDate}. ${tweetText}`,
      images: [
        {
          url: imageForMetadata,
          width: isPhoto ? media?.sizes?.large?.w || 1280 : 1280,
          height: isPhoto ? media?.sizes?.large?.h || 720 : 720,
          alt: tweetMediaAltText || `Archived Tweet ${id} | Ye Tweets Archive`,
        },
      ],
      siteName: "Ye Tweets Archive",
      url: `https://yetweets.xyz/archive/tweets/${id}`,
    },
    twitter: {
      card: tweetMedia ? "summary_large_image" : "summary",
      title: `Archived Tweet by ${tweetAuthor}: "${gracefullyTruncate(
        tweetText
      )}"`,
      description: `Archived Tweet originally posted on ${tweetCreationDate}: "${tweetText}"`,
      images: [imageForMetadata],
    },
  };
}

const InfoBar = ({ tweet }: { tweet: Tweet }) => {
  const mediaCount = tweet.extended_entities?.media?.length || 0;
  const mediaTypes = tweet.extended_entities?.media
    ? tweet.extended_entities.media.reduce((acc, media) => {
        if (media?.type) {
          acc[media.type] = (acc[media.type] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>)
    : {};

  const formatMediaText = (type: string, count: number) => {
    if (count === 1) return `${type}`;
    return `${type}s`;
  };

  return (
    <div className="flex gap-2 select-none">
      <Badge className="bg-primary-foreground border-border text-foreground">
        {tweet.favorite_count} Likes
      </Badge>
      <Badge className="bg-primary-foreground border-border text-foreground">
        {tweet.retweet_count} Retweets
      </Badge>
      {mediaCount > 0 && (
        <Badge className="bg-primary-foreground border-border text-foreground">
          {mediaCount} Media (
          {Object.entries(mediaTypes)
            .map(([type, count]) => formatMediaText(type, count))
            .join(", ")}
          )
        </Badge>
      )}
      {tweet.deleted && (
        <Badge className="bg-primary-foreground border-destructive text-foreground">
          Deleted
        </Badge>
      )}
    </div>
  );
};

export default async function Page({ params }: { params: { id: string } }) {
  const tweet = await getData(params.id);
  if (!tweet) notFound();

  const formattedDate = new Date(tweet.created_at).toLocaleString();
  const kanyeEra = findEra(new Date(tweet.created_at));
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(", ") : kanyeEra;
  const isRetweet = detectRetweet(tweet.text);

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
                <span className="font-semibold leading-none tracking-tight">
                  ye
                </span>
                <span className="text-sm text-muted-foreground">
                  @kanyewest
                </span>
              </div>
            </div>
            <div className="-mt-[8px] flex gap-2 select-none">
              {/* <MissingMedia hasMissingMedia={!!tweet.entities?.media} /> */}
              <div className="flex gap-2">
                {tweet?.retweeted_status && (
                  <Badge className="bg-primary-foreground border-border text-foreground">
                    Retweeted
                  </Badge>
                )}
                {tweet.is_quote_status && (
                  <Badge className="bg-primary-foreground border-border text-foreground">
                    Qoute Tweet
                  </Badge>
                )}
                {tweet.in_reply_to_status_id_str && (
                  <Badge className="bg-primary-foreground border-border text-foreground">
                    Reply
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold leading-relaxed">
            <div className="mb-4">
              <TweetRenderer tweet={tweet.text} entities={tweet.entities} />
            </div>
            {tweet.extended_entities &&
              tweet.extended_entities.media &&
              tweet.extended_entities.media.length > 0 && (
                <MediaRenderer media={tweet.extended_entities.media} />
              )}
            {tweet.entities &&
              tweet.entities.urls.length > 0 &&
              !tweet.entities.media &&
              !tweet.entities.urls[0].expanded_url.includes(
                "https://twitter.com/i/web"
              ) && <LinkPreview url={tweet.entities?.urls[0].expanded_url} />}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex flex-col w-full gap-2">
            <InfoBar tweet={tweet} />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{formattedDate}</span>
              <span>{eraContent}</span>
            </div>
            <Share
              shareUrl={`https://yetweets.xyz/archive/tweets/${params.id}`}
            />
          </div>
        </CardFooter>
      </Card>
      <div className="flex gap-4 mt-4">
        <Link href="/archive">
          <Button asChild size="lg" variant={"secondary"}>
            <span>Return to Archive</span>
          </Button>
        </Link>
        <Link href={`${VAULT_URL}/tweets/${params.id}.json`} target="_blank">
          <Button asChild size="lg" variant={"outline"}>
            <span>View Raw JSON</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
