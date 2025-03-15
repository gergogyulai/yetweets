import Link from "next/link";
import React from "react";
import { Tweet } from "@/lib/types";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import findEra from "@/lib/era";
import { VAULT_URL } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import InfoBar from "@/components/info-bar";
import Profile from "@/components/profile-picture";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FilterIcon } from "lucide-react";

interface SearchParams {
  query?: string;
  startDate?: string;
  endDate?: string;
  hasImages?: string;
  hasVideos?: string;
  era?: string;
}

async function fetchTweets(): Promise<Tweet[]> {
  const res = await fetch(`${VAULT_URL}/master.json`);
  return res.json();
}

async function getEras(): Promise<string[]> {
  try {
    const { allEras } = await import("@/lib/era");
    // Ensure we return array of strings
    return allEras.map(era => era.name);
  } catch (error) {
    console.error("Error loading eras:", error);
    // Fallback to a basic list if there's an error
    return [
      "The College Dropout",
      "Late Registration",
      "Graduation",
      "808s & Heartbreak",
      "My Beautiful Dark Twisted Fantasy",
      "Watch The Throne",
      "Yeezus",
      "The Life of Pablo",
      "ye",
      "Kids See Ghosts",
      "Jesus is King",
      "Donda",
      "Vultures"
    ];
  }
}

function fuzzySearch(text: string, query: string): boolean {
  if (!query || !text) return true;
  
  // Split the query into words for better multi-term search
  const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const textLower = text.toLowerCase();
  
  // All terms must match for a result to be considered a match
  return queryTerms.every(term => {
    // Simple word match - if the term appears as a whole word, it's a strong match
    if (textLower.includes(term)) {
      return true;
    }
    
    // Character by character fuzzy match
    let textIndex = 0;
    for (const char of term) {
      textIndex = textLower.indexOf(char, textIndex);
      if (textIndex === -1) return false;
      textIndex++;
    }
    
    return true;
  });
}

function filterTweets(tweets: Tweet[], params: SearchParams): Tweet[] {
  // Start with all tweets
  let filteredTweets = [...tweets];
  
  // Text search
  if (params.query && params.query.trim() !== '') {
    filteredTweets = filteredTweets.filter(tweet => {
      const tweetText = tweet.truncated && tweet.extended_tweet 
        ? tweet.extended_tweet.full_text 
        : tweet.text;
      return fuzzySearch(tweetText, params.query || '');
    });
  }
  
  // Date filter
  if (params.startDate) {
    const startDate = new Date(params.startDate);
    filteredTweets = filteredTweets.filter(tweet => 
      new Date(tweet.created_at) >= startDate
    );
  }
  
  if (params.endDate) {
    const endDate = new Date(params.endDate);
    filteredTweets = filteredTweets.filter(tweet => 
      new Date(tweet.created_at) <= endDate
    );
  }
  
  // Media filters
  const hasImages = params.hasImages === 'true';
  const hasVideos = params.hasVideos === 'true';
  
  if (hasImages || hasVideos) {
    filteredTweets = filteredTweets.filter(tweet => {
      const isTruncated = tweet.truncated;
      const isLegacyImported = tweet.legacy_imported;

      const media = isLegacyImported
        ? tweet.media
        : isTruncated
          ? tweet.extended_tweet?.extended_entities?.media
          : tweet.extended_entities?.media;
      
      if (!media || media.length === 0) return false;
      
      if (hasImages && hasVideos) {
        return media.some(mediaItem => 
          mediaItem.type === "photo" || mediaItem.type === "video"
        );
      } else if (hasImages) {
        return media.some(mediaItem => mediaItem.type === "photo");
      } else if (hasVideos) {
        return media.some(mediaItem => mediaItem.type === "video");
      }
      
      return false;
    });
  }
  
  // Era filter
  if (params.era && params.era !== 'all') {
    filteredTweets = filteredTweets.filter(tweet => {
      const tweetDate = new Date(tweet.created_at);
      const tweetEras = findEra(tweetDate);
      return tweetEras.includes(params.era || '');
    });
  }
  
  return filteredTweets;
}

function TweetCard({ tweet }: { tweet: Tweet }) {
  const formattedDate = new Date(tweet.created_at).toLocaleDateString();
  const fullDateTime = new Date(tweet.created_at).toLocaleString();
  const kanyeEra = findEra(new Date(tweet.created_at));
  const eraContent = Array.isArray(kanyeEra) ? kanyeEra.join(", ") : kanyeEra;

  return (
    <Link
      href={`/archive/tweets/${tweet.id_str}`}
      prefetch={false}
      className="block w-full"
    >
      <Card className="mb-6 flex h-full flex-col justify-between transition-all ease-in-out hover:border-black dark:hover:border-white">
        <CardHeader className="flex w-full pb-0">
          <div className="flex items-center justify-between">
            <Profile tweet={tweet} />
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
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-xl font-semibold leading-relaxed">
            {tweet.text}
          </div>
        </CardContent>
        <CardFooter className="flex w-full flex-col gap-2">
          <div className="w-full">
            <InfoBar tweet={tweet} />
          </div>
          <div className="flex w-full items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm text-muted-foreground">
                    {formattedDate}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{fullDateTime}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm text-muted-foreground">{eraContent}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default async function ArchivePage({
  params,
  searchParams,
}: {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const data = await fetchTweets();
  const erasList = await getEras();
  
  // Extract search params directly
  const extractedParams: SearchParams = {
    query: typeof searchParams.query === 'string' ? searchParams.query : undefined,
    startDate: typeof searchParams.startDate === 'string' ? searchParams.startDate : undefined,
    endDate: typeof searchParams.endDate === 'string' ? searchParams.endDate : undefined,
    hasImages: typeof searchParams.hasImages === 'string' ? searchParams.hasImages : undefined,
    hasVideos: typeof searchParams.hasVideos === 'string' ? searchParams.hasVideos : undefined,
    era: typeof searchParams.era === 'string' ? searchParams.era : undefined
  };
  
  const filteredData = filterTweets(data, extractedParams);
  
  const sortedData = filteredData.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  
  const numberOfTweets = sortedData.length;
  const totalTweets = data.length;
  const numberOfMedia = sortedData.filter((tweet) => {
    const isTruncated = tweet.truncated;
    const isLegacyImported = tweet.legacy_imported;

    const media = isLegacyImported
      ? tweet.media
      : isTruncated
        ? tweet.extended_tweet?.extended_entities?.media
        : tweet.extended_entities?.media;

    return media?.some(
      (mediaItem) => mediaItem.type === "photo" || mediaItem.type === "video",
    );
  }).length;

  const numberOfDeleted = sortedData.filter((tweet) => tweet.deleted).length;

  // Find min and max dates for range sliders
  const dates = data.map(tweet => new Date(tweet.created_at).getTime());
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  
  const minDateStr = minDate.toISOString().split('T')[0];
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  const startDate = extractedParams.startDate || minDateStr;
  const endDate = extractedParams.endDate || maxDateStr;

  // Determine if any filters are applied
  const hasActiveFilters = !!(
    extractedParams.query || 
    extractedParams.startDate || 
    extractedParams.endDate || 
    extractedParams.hasImages === "true" || 
    extractedParams.hasVideos === "true" || 
    extractedParams.era
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Archive</h1>
          <Link href={"/#statistics"}>
            <p className="text-lg text-muted-foreground">
              {numberOfTweets} tweets out of {totalTweets}
              {numberOfMedia > 0 && ` · ${numberOfMedia} media items`}
              {numberOfDeleted > 0 && ` · ${numberOfDeleted} deleted`}
            </p>
          </Link>
        </header>
        
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Mobile filter toggle */}
          <div className="md:hidden w-full mb-4">
            <Collapsible>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FilterIcon size={20} />
                  <span className="font-medium">Filters</span>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">Active</Badge>
                  )}
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <FilterIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle filters</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <form action="/archive" method="get" className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="query-mobile">Search tweets</Label>
                        <Input 
                          id="query-mobile" 
                          name="query" 
                          placeholder="Search tweets..." 
                          defaultValue={extractedParams.query || ""} 
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <Label>Date range</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate-mobile" className="text-xs">From</Label>
                            <Input 
                              id="startDate-mobile" 
                              name="startDate" 
                              type="date" 
                              defaultValue={startDate}
                              min={minDateStr}
                              max={endDate}
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate-mobile" className="text-xs">To</Label>
                            <Input 
                              id="endDate-mobile" 
                              name="endDate" 
                              type="date" 
                              defaultValue={endDate}
                              min={startDate}
                              max={maxDateStr}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <Label>Media</Label>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="hasImages-mobile" 
                              name="hasImages" 
                              value="true" 
                              defaultChecked={extractedParams.hasImages === "true"} 
                            />
                            <Label htmlFor="hasImages-mobile" className="text-sm">With images</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="hasVideos-mobile" 
                              name="hasVideos" 
                              value="true" 
                              defaultChecked={extractedParams.hasVideos === "true"} 
                            />
                            <Label htmlFor="hasVideos-mobile" className="text-sm">With videos</Label>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <Label htmlFor="era-mobile">Era</Label>
                        <Select name="era" defaultValue={extractedParams.era}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select era" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All eras</SelectItem>
                            <ScrollArea className="h-80">
                              {erasList.map((era) => (
                                <SelectItem key={era} value={era}>
                                  {era}
                                </SelectItem>
                              ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex w-full gap-2">
                        <Button 
                          type="submit" 
                          className="flex-1"
                        >
                          Apply Filters
                        </Button>
                        <a href="/archive" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-shrink-0">
                          Clear
                        </a>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* Desktop search panel - left sidebar */}
          <div className="hidden md:block w-full md:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <h2 className="text-xl font-semibold">Search & Filter</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <form action="/archive" method="get" className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="query">Search tweets</Label>
                    <Input 
                      id="query" 
                      name="query" 
                      placeholder="Search tweets..." 
                      defaultValue={extractedParams.query || ""} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label>Date range</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate" className="text-xs">From</Label>
                        <Input 
                          id="startDate" 
                          name="startDate" 
                          type="date" 
                          defaultValue={startDate}
                          min={minDateStr}
                          max={endDate}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate" className="text-xs">To</Label>
                        <Input 
                          id="endDate" 
                          name="endDate" 
                          type="date" 
                          defaultValue={endDate}
                          min={startDate}
                          max={maxDateStr}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label>Media</Label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasImages" 
                          name="hasImages" 
                          value="true" 
                          defaultChecked={extractedParams.hasImages === "true"} 
                        />
                        <Label htmlFor="hasImages" className="text-sm">With images</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasVideos" 
                          name="hasVideos" 
                          value="true" 
                          defaultChecked={extractedParams.hasVideos === "true"} 
                        />
                        <Label htmlFor="hasVideos" className="text-sm">With videos</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label htmlFor="era">Era</Label>
                    <Select name="era" defaultValue={extractedParams.era}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select era" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All eras</SelectItem>
                        <ScrollArea className="h-80">
                          {erasList.map((era) => (
                            <SelectItem key={era} value={era}>
                              {era}
                            </SelectItem>
                          ))}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex w-full gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1"
                    >
                      Apply Filters
                    </Button>
                    <a href="/archive" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-shrink-0">
                      Clear
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Tweets grid - right content */}
          <div className="w-full md:w-3/4 mt-6 md:mt-0">
            {sortedData.length > 0 ? (
              <div className="grid auto-rows-fr gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                {sortedData.map((item: Tweet, index: number) => (
                  <TweetCard key={index} tweet={item} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <h3 className="mb-2 text-2xl font-semibold">No tweets found</h3>
                  <p className="text-center text-muted-foreground">
                    {"Try adjusting your search filters to find what you're looking for."}
                  </p>
                  <a href="/archive" className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Reset All Filters
                  </a>
                </CardContent>
              </Card>
            )}
            
            {sortedData.length > 0 && (
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedData.length} of {totalTweets} tweets
                </p>
                {hasActiveFilters && (
                  <a 
                    href="/archive"
                    className="text-sm text-primary hover:underline"
                  >
                    Clear All Filters
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
