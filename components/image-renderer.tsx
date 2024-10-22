import React from "react";
import Image from "next/image";
import Link from "next/link";
import { type Media } from "@/lib/types";
import { VAULT_URL } from "@/lib/utils";

function extractMediaIdentifier(mediaUrlHttps: string): string | null {
  const matches = mediaUrlHttps.match(/\/media\/([^.]+)/);
  return matches && matches[1] ? matches[1] : null;
}

function getGridClass(count: number): string {
  switch (count) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-2";
    default:
      return "grid-cols-2";
  }
}

function getImageClass(index: number, count: number): string {
  if (count === 1) return "col-span-1 row-span-1";
  if (count === 3 && index === 0) return "col-span-2 row-span-2";
  return "col-span-1 row-span-1";
}

export default function MediaRenderer({ media }: { media: Media[] }) {
  if (media[0].expanded_url?.includes("video"))
    return (
      <div className="mt-2 text-sm text-muted-foreground">
        Video media is not supported at all.
      </div>
    );

  return (
    <div
      className={`grid ${getGridClass(media.length)} max-w-2xl gap-1 overflow-hidden`}
    >
      {media.map((item, index) => {
        const identifier = extractMediaIdentifier(item.media_url_https);
        const imageUrl = identifier
          ? `${VAULT_URL}/media/${identifier}.jpg`
          : "";

        return (
          <Link
            target="_blank"
            title="Open Image"
            rel="noopener noreferer"
            href={imageUrl}
            key={item.id_str}
          >
            <div
              className={`${getImageClass(index, media.length)} relative cursor-pointer overflow-hidden`}
              style={{ paddingBottom: "100%" }}
            >
              <Image
                src={imageUrl}
                alt="Tweet Media"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
