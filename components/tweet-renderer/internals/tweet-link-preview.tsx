import { Card, CardContent } from "@/components/ui/card";
import extractMetaTags from "@/lib/extract-metadata";
import { Url } from "@/lib/types";
import { truncateUrl } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ExternalLink from "@/components/external-link";

export default async function TweetLinkPreview({ url }: { url: Url | string }) {
  const urlString = typeof url === "string" ? url : url.expanded_url;
  const displayUrl =
    typeof url === "string" ? truncateUrl(url, 50) : url.display_url;
  const data = await extractMetaTags(urlString);

  return (
    <ExternalLink href={urlString} target={"_blank"}>
      <Card className="w-full max-w-2xl overflow-hidden">
        <div className="flex h-[200px] cursor-pointer select-none flex-col bg-muted text-muted-foreground transition-colors hover:bg-muted/80 sm:flex-row">
          {data?.image ? (
            <div className="h-full w-full sm:w-[200px] sm:min-w-[200px] sm:max-w-[200px]">
              <AspectRatio ratio={1} className="h-full">
                <img
                  src={data.image}
                  alt={data.title || "Link preview image"}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 sm:w-[200px] sm:min-w-[200px] sm:max-w-[200px]">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <CardContent className="flex h-full min-w-0 flex-1 flex-col justify-between overflow-hidden p-4">
            <div className="overflow-hidden">
              <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight">
                {data?.title || "No title available"}
              </h3>
              {data?.description && (
                <p className="mb-2 line-clamp-2 text-sm">{data.description}</p>
              )}
            </div>
            <span className="mt-auto block truncate text-xs opacity-50">
              {displayUrl}
            </span>
          </CardContent>
        </div>
      </Card>
    </ExternalLink>
  );
}
