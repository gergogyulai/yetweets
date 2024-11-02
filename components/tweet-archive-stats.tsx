import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImage, FileVideo, MessageSquare, Trash2, Clock, FolderArchive } from "lucide-react"
import { Tweet } from "@/lib/types"
import { VAULT_URL, VAULT_REPO } from "@/lib/utils"

async function fetchArchivedTweets(): Promise<Tweet[]> {
  const res = await fetch(`${VAULT_URL}/master.json`)
  return res.json()
}

async function fetchArchivedMedia() {
  const response = await fetch(
    `https://api.github.com/repos/${VAULT_REPO}/contents/media`
  )
  return response.json()
}

async function fetchArchivedVideos() {
  const response = await fetch(
    `https://api.github.com/repos/${VAULT_REPO}/contents/videos`
  )
  return response.json()
}

function hasMediaType(tweet: Tweet, type: string): boolean {
  const isTruncated = tweet.truncated
  const isLegacyImported = tweet.legacy_imported

  const media = isLegacyImported
    ? tweet.media
    : isTruncated
    ? tweet.extended_tweet?.extended_entities?.media
    : tweet.extended_entities?.media

  return media?.some((mediaItem) => mediaItem.type === type) ?? false
}

export default async function TwitterArchiveStats() {
  const archivedTweets = await fetchArchivedTweets()
  const archivedMedia = await fetchArchivedMedia()
  const archivedVideos = await fetchArchivedVideos()

  const archivedTweetsSorted = archivedTweets.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  const numberOfMedia = archivedTweetsSorted.filter(
    (tweet) => hasMediaType(tweet, "photo") || hasMediaType(tweet, "video")
  ).length

  const numberOfPhotos = archivedTweetsSorted.filter((tweet) =>
    hasMediaType(tweet, "photo")
  ).length

  const numberOfVideos = archivedTweetsSorted.filter((tweet) =>
    hasMediaType(tweet, "video")
  ).length

  const numberOfTweets = archivedTweets.length
  const numberOfArchivedMedia = archivedMedia.length
  const numberOfArchivedVideos = archivedVideos.length

  const numberOfDeleted = archivedTweetsSorted.filter((tweet) => tweet.deleted).length

  const oldestTweet = archivedTweetsSorted[archivedTweetsSorted.length - 1]
  const newestTweet = archivedTweetsSorted[0]

  return (
    <div className="px-4 md:px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tweets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfTweets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deleted Tweets</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfDeleted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archived Images</CardTitle>
            <FileImage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfArchivedMedia}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archived Videos</CardTitle>
            <FileVideo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfArchivedVideos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tweets with Media</CardTitle>
            <FolderArchive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numberOfMedia}</div>
            <p className="text-xs text-muted-foreground">
              With Photos: {numberOfPhotos} | With Videos: {numberOfVideos}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archive Timespan</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <p>Oldest: {new Date(oldestTweet.created_at).toLocaleDateString()}</p>
              <p>Newest: {new Date(newestTweet.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}