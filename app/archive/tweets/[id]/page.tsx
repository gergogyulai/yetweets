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
  extractMediaInfentifierFromUrl,
  getMediaUrl,
  gracefullyTruncate,
  removeTcoLink,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { VAULT_URL } from "@/lib/utils";
import TweetRendererV2 from "@/components/tweet-renderer";

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

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { id } = params;

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
  // const isVideo = media?.type === "video";
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
      tweetText,
    )}" | Ye Tweets Archive`,
    description: `Archived Tweet from ${tweetAuthor} posted on ${tweetCreationDate}: "${tweetText}"`,
    openGraph: {
      title: `Archived Tweet by ${tweetAuthor}: "${gracefullyTruncate(
        tweetText,
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
        tweetText,
      )}"`,
      description: `Archived Tweet originally posted on ${tweetCreationDate}: "${tweetText}"`,
      images: [imageForMetadata],
    },
  };
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
    <div className="flex select-none gap-2">
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

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const tweet = await getData(params.id);
  if (!tweet) notFound();

  const formattedDate = new Date(tweet.created_at).toLocaleString();
  const kanyeEra = findEra(new Date(tweet.created_at));
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(", ") : kanyeEra;

  console.log(tweet);

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <Card className="w-full max-w-xl bg-card text-card-foreground shadow">
        <CardContent className="flex flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={"/archive"} className="rounded-full">
                <Image
                  src="/pfp.jpg"
                  alt="Kanye West"
                  width={45}
                  height={45}
                  className="rounded-full transition-all ease-in-out hover:brightness-75"
                />
              </Link>
              <Link href={"/archive"} className="hover:underline">
                <div className="mt-[2px] flex flex-col">
                  <span className="font-semibold leading-none tracking-tight">
                    ye
                  </span>
                  <span className="text-sm text-muted-foreground">
                    @kanyewest
                  </span>
                </div>
              </Link>
            </div>
            <div className="-mt-[8px] flex select-none gap-2">
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
          </div>
          <div className="text-xl font-semibold leading-relaxed">
            <TweetRendererV2 tweet={tweet} />
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex w-full flex-col gap-2">
            <div className="mb-2">
              <InfoBar tweet={tweet} />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{formattedDate}</span>
              <span>{eraContent}</span>
              {/* <Era date={new Date(tweet.created_at)} /> */}
            </div>
            <Share
              shareUrl={`https://yetweets.xyz/archive/tweets/${params.id}`}
            />
          </div>
        </CardFooter>
      </Card>
      <div className="mt-4 flex flex-col gap-4">
        <Link
          href={`${VAULT_URL}/tweets/${params.id}.json`}
          target="_blank"
          className="block"
        >
          <Button asChild size="lg" variant={"outline"}>
            <span>View Raw JSON</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
