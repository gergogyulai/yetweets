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

  const hasMedia = (tweet.extended_entities?.media?.length ?? 0) > 0;
  const urls = tweet?.entities?.urls || [];
  const hasUrls = urls.length > 0;

  return (
    <div id={divId}>
      {/* Tweet Text */}
      {tweet?.text && (
        <div className={hasMedia && renderMedia ? "mb-4" : "mb-0"}>
          <TweetText tweetText={tweet.text} entities={tweet.entities} />
        </div>
      )}

      {/* Tweet Media */}
      {hasMedia && renderMedia && (
        <TweetImage media={tweet.extended_entities!.media} />
      )}

      {/* Tweet Link Previews */}
      {hasUrls && renderLinkPreviews && (
        <div>
          {urls
            .filter((url) => isValidUrl(url.expanded_url))
            .map((url, index) => (
              <TweetLinkPreview key={index} url={url.expanded_url} />
            ))}
        </div>
      )}
    </div>
  );
}
