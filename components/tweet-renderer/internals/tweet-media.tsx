import Image from "next/image";
import Link from "next/link";
import { type Media } from "@/lib/types";
import { VAULT_REPO, VAULT_URL, extractMediaIdentifierFromUrl } from "@/lib/utils";

type GridClass = "grid-cols-1" | "grid-cols-2";
type ImageClass = "col-span-1 row-span-1" | "col-span-2 row-span-2";

function getGridClass(count: number): GridClass {
  return count === 1 ? "grid-cols-1" : "grid-cols-2";
}

function getImageClass(index: number, count: number): ImageClass {
  return count === 3 && index === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
}

async function isMediaArchived(mediaId: string, mediaType: "photo" | "video"): Promise<boolean> {
  const path = mediaType === "photo" ? `media/${mediaId}.jpg` : `videos/${mediaId}.mp4`;
  const response = await fetch(`https://api.github.com/repos/${VAULT_REPO}/contents/${path}`);
  return response.ok;
}

export default async function TweetMedia({ media }: { media: Media[] }) {
  const mediaItems = await Promise.all(
    media.map(async (item) => {
      const isVideo = item.expanded_url?.includes("video") || item.type === "video";
      const identifier = isVideo ? item.id_str : extractMediaIdentifierFromUrl(item.media_url_https);
      const isArchived = identifier ? await isMediaArchived(identifier, isVideo ? "video" : "photo") : false;
      const mediaUrl = isArchived ? `${VAULT_URL}/${isVideo ? "videos" : "media"}/${identifier}.${isVideo ? "mp4" : "jpg"}` : null;

      return { ...item, isVideo, isArchived, mediaUrl };
    })
  );

  if (mediaItems[0].isVideo) {
    return mediaItems[0].isArchived ? (
      <video controls className="w-full rounded-md">
        <source src={mediaItems[0].mediaUrl!} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
    ) : (
      <p className="mt-2 text-sm text-muted-foreground">This video is not archived yet. Come back later, or submit it to the archive :)</p>
    );
  }

  return (
    <div className={`grid ${getGridClass(mediaItems.length)} max-w-2xl gap-1 overflow-hidden rounded-md`}>
      {mediaItems.map((item, index) => (
        <div
          key={item.id_str}
          className={`${getImageClass(index, mediaItems.length)} relative overflow-hidden`}
          style={{ paddingBottom: item.isArchived ? "100%" : "0" }}
        >
          {item.isArchived ? (
            <Link
              href={item.mediaUrl!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open full-size image"
            >
              <Image
                src={item.mediaUrl!}
                alt="Tweet media"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
              <p>
                Image not available
                <br />
                <span className="text-xs">This image is not archived yet.</span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}