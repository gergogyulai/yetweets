import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { extractMetaTags } from "@/lib/extract-meta";

interface LinkPreviewProps {
  url: string;
}

export default async function LinkPreview({ url }: LinkPreviewProps) {
  const data = await extractMetaTags(url);

  if (!data) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-4">
          <p className="text-red-500">Failed to fetch link preview.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <Link
        href={url}
        target="_blank"
        className="flex items-center bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
      >
        <div className="relative h-[200px] w-[340px]">
          <img
            src={data.image}
            alt="Link Preview"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <CardContent className="p-4 w-[60%]">
          <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
            {data.title}
          </h3>
          <p className="text-sm line-clamp-3 mb-2">{data.description}</p>
          <span className="text-xs opacity-50">{url}</span>
        </CardContent>
      </Link>
    </Card>
  );
}
