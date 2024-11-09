import { Tweet } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const InfoBar = ({ tweet }: { tweet: Tweet }) => {
  const isLegacyImported = tweet.legacy_imported;
  const mediaCount = isLegacyImported
    ? tweet.media?.length || 0
    : tweet.extended_entities?.media?.length || 0;

  const mediaTypes =
    (isLegacyImported ? tweet.media : tweet.extended_entities?.media)?.reduce(
      (acc, media) => {
        if (media?.type) {
          acc[media.type] = (acc[media.type] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

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

export default InfoBar;
