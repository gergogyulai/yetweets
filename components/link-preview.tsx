import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import extractMetaTags from "@/lib/extract-metadata";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Url } from "@/lib/types";
import { truncateToDomain, truncateUrl } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function LinkPreview({ url }: { url: Url | string}) {
  const urlString = typeof url === 'string' ? url : url.expanded_url;
  const displayUrl = typeof url === 'string' ? truncateUrl(url, 50) : url.display_url;
  const displayDomain = truncateToDomain(urlString);
  const data = await extractMetaTags(urlString);
  
  const renderContent = () => (
    <Card className="w-full max-w-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row bg-muted text-muted-foreground hover:bg-muted/80 transition-colors select-none cursor-pointer h-[200px]">
        {data?.image ? (
          <div className="w-full sm:w-[200px] sm:min-w-[200px] sm:max-w-[200px] h-full">
            <AspectRatio ratio={1} className="h-full">
              <img
                src={data.image}
                alt={data.title || "Link preview image"}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        ) : (
          <div className="w-full sm:w-[200px] sm:min-w-[200px] sm:max-w-[200px] h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        <CardContent className="flex flex-col justify-between p-4 flex-1 min-w-0 h-full overflow-hidden">
          <div className="overflow-hidden">
            <h3 className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
              {data?.title || "No title available"}
            </h3>
            {data?.description && (
              <p className="text-sm line-clamp-2 mb-2">{data.description}</p>
            )}
          </div>
          <span className="text-xs opacity-50 truncate block mt-auto">{displayUrl}</span>
        </CardContent>
      </div>
    </Card>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {renderContent()}
      </AlertDialogTrigger>
      <AlertDialogContent className="font-mono">
        <AlertDialogHeader>
          <AlertDialogTitle>
            You are about to leave the site
          </AlertDialogTitle>
          <AlertDialogDescription>
            This link leads to an external site ({displayDomain}). Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Back</AlertDialogCancel>
          <Link 
            href={urlString}
            target="_blank"
            rel="noopener noreferrer"  
          >
            <AlertDialogAction>Go</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}