import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import findEra from "@/lib/era";
import { Tweet } from "@/lib/types";
import Share from "@/components/share";
import Link from "next/link";
import {
  extractMediaIdentifierFromUrl,
  getMediaUrl,
  gracefullyTruncate,
  removeTcoLink,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { VAULT_URL } from "@/lib/utils";
import TweetRendererV2 from "@/components/tweet-renderer";
import InfoBar from "@/components/info-bar";
import Profile from "@/components/profile-picture";
import { ArchiveIcon, ExternalLink } from "lucide-react";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch(`${VAULT_URL}/master.json`);
  const data = await res.json();

  return data.map((tweet: { id_str: string }) => ({
    params: { id: tweet.id_str },
  }));
}

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

  const tweet: Tweet | null = await getData(id);

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

  const isTruncated = tweet.truncated;
  const isLegacyImported = tweet.legacy_imported;
  // @typescript-eslint/no-non-null-asserted-optional-chain
  // add back ! to tweet.extended_tweet?.full_text 89:7  Error: Optional chain expressions can return undefined by design - using a non-null assertion is unsafe and wrong.  @typescript-eslint/no-non-null-asserted-optional-chain
  const tweetText = isTruncated ? tweet.extended_tweet?.full_text : tweet.text;
  const media = isLegacyImported
    ? tweet.media
    : isTruncated
      ? tweet.extended_tweet?.extended_entities?.media
      : tweet.extended_entities?.media;
  const isPhoto = media?.[0]?.type === "photo";
  const tweetMedia = isPhoto
    ? getMediaUrl(extractMediaIdentifierFromUrl(media?.[0]?.media_url_https))
    : null;
  const tweetMediaAltText = isPhoto
    ? `Archived image from tweet by ye`
    : "Archived media from tweet";
  const fallbackImage = "/og.png";
  const imageForMetadata = tweetMedia || fallbackImage;
  const tweetAuthor = "ye";
  const tweetCreationDate = tweet?.created_at
    ? new Date(tweet.created_at).toLocaleString("en-US", { timeZone: "UTC" })
    : "Unknown date";

  return {
    title: `Archived Tweet by ${tweetAuthor}: "${gracefullyTruncate(removeTcoLink(tweetText || ""))}" | Ye Tweets Archive`,
    description: `Archived Tweet from ${tweetAuthor} posted on ${tweetCreationDate}: "${removeTcoLink(tweetText || "")}"`,
    openGraph: {
      title: `Archived Tweet by ${tweetAuthor}: "${gracefullyTruncate(removeTcoLink(tweetText || ""))}"`,
      description: `View this archived Tweet from ${tweetAuthor}, originally posted on ${tweetCreationDate}. ${removeTcoLink(tweetText || "")}`,
      images: [
        {
          url: imageForMetadata,
          width: isPhoto ? media?.[0]?.sizes?.large?.w || 1280 : 1280,
          height: isPhoto ? media?.[0]?.sizes?.large?.h || 720 : 720,
          alt: tweetMediaAltText || `Archived Tweet ${id} | Ye Tweets Archive`,
        },
      ],
      siteName: "Ye Tweets Archive",
      url: `https://yetweets.xyz/archive/tweets/${id}`,
    },
    twitter: {
      card: tweetMedia ? "summary_large_image" : "summary",
      title: `Archived Tweet by ${tweetAuthor}: "${gracefullyTruncate(removeTcoLink(tweetText || ""))}"`,
      description: `Archived Tweet originally posted on ${tweetCreationDate}: "${removeTcoLink(tweetText || "")}"`,
      images: [imageForMetadata],
    },
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const tweet = await getData(params.id);
  if (!tweet) notFound();

  const formattedDate = new Date(tweet.created_at).toLocaleString();
  const kanyeEra = findEra(new Date(tweet.created_at));
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(", ") : kanyeEra;

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <Card className="w-full max-w-xl bg-card text-card-foreground shadow">
        <CardContent className="flex flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <Profile tweet={tweet} />
            <div className="mt-[-8px] flex select-none gap-2">
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
      <div className="mt-4 flex flex-row gap-4">
        <Link
          href={`${VAULT_URL}/tweets/${params.id}.json`}
          target="_blank"
          className="block"
        >
          <Button asChild size="lg" variant={"outline"}>
            <div className="flex gap-2">
              <ExternalLink size={18} />
              <span>View Raw JSON</span>
            </div>
          </Button>
        </Link>
        <Link
          href={`https://web.archive.org/web/*/https://twitter.com/kanyewest/status/${tweet.id_str}`}
          target="_blank"
        >
          <Button asChild size="lg" variant={"outline"}>
            <div className="flex gap-2">
              <ArchiveIcon size={18} />
              <span className="">Open Wayback Machine</span>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}
