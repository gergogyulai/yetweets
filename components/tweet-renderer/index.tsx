import TweetImage from "@/components/tweet-renderer/internals/tweet-image";
import TweetLinkPreview from "@/components/tweet-renderer/internals/tweet-link-preview";
import TweetText from "@/components/tweet-renderer/internals/tweet-text";
import { Tweet } from "@/lib/types";
import { isValidUrl } from "@/lib/utils";

const divId =
  process.env.NODE_ENV === "development" ? "tweet-renderer-dev" : undefined;

export default function TweetRendererV2({
  tweet,
  renderMedia = true,
  renderLinkPreviews = true,
}: {
  tweet: Tweet;
  renderMedia?: boolean;
  renderLinkPreviews?: boolean;
}) {
  if (!tweet) {
    console.error("Invalid tweet data");
    return null;
  }

  const isTruncated = tweet.truncated;
  const tweetText = isTruncated ? tweet.extended_tweet?.full_text : tweet.text;
  const tweetEntities = isTruncated ? tweet.extended_tweet?.entities : tweet.entities;
  const tweetMedia = isTruncated ? tweet.extended_tweet?.extended_entities?.media : tweet.extended_entities?.media;

  const hasMedia = (tweetMedia?.length ?? 0) > 0;
  const urls = tweetEntities?.urls || [];
  const hasUrls = urls.length > 0;

  return (
    <div id={divId}>
      {/* Tweet Text */}
      {tweetText && (
        <div className={hasMedia && renderMedia ? "mb-4" : "mb-0"}>
          <TweetText tweetText={tweetText} entities={tweetEntities} />
        </div>
      )}

      {/* Tweet Media */}
      {hasMedia && renderMedia && (
        <TweetImage media={tweetMedia || []} />
      )}

      {/* Tweet Link Previews */}
      {hasUrls && renderLinkPreviews && (
        <div>
          {urls
            .filter((url: { expanded_url: string }) => isValidUrl(url.expanded_url))
            .map((url: { expanded_url: string }, index: number) => (
              <TweetLinkPreview key={index} url={url.expanded_url} />
            ))}
        </div>
      )}
    </div>
  );
}