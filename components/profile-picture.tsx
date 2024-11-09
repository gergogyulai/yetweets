import { Tweet } from "@/lib/types";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import React from "react";
import { extractProfileImageId, formattedLargeNumber } from "@/lib/utils";

const fallbackProfilePictureId = "cqNhNk6v";
const fallbackDisplayName = "Kanye West";
const fallbackUsername = "@kanyewest";

const getProfileImageUrl = (tweet: Tweet): string => {
  if (tweet.legacy_imported) {
    return fallbackProfilePictureId;
  }
  return tweet.user?.profile_image_url_https
    ? extractProfileImageId(tweet.user.profile_image_url_https)
    : fallbackProfilePictureId;
};

const getDisplayName = (tweet: Tweet): string => {
  return tweet.user?.name || fallbackDisplayName;
};

const getUsername = (tweet: Tweet): string => {
  return tweet.user?.screen_name ? `@${tweet.user.screen_name}` : fallbackUsername;
};

const ProfilePicture = ({ url }: { url: string }) => (
  <Image
    src={`https://lp7x2l6b4majf9v9.public.blob.vercel-storage.com/profile_images/${url}.jpg`}
    alt="Profile Picture"
    width={45}
    height={45}
    className="rounded-full"
  />
);

const ProfileName = ({ displayName, username }: { displayName: string; username: string }) => (
  <div className="flex flex-col">
    <span className="font-semibold leading-none tracking-tight">{displayName}</span>
    <span className="text-sm text-muted-foreground">{username}</span>
  </div>
);

const InlineProfile = ({ tweet }: { tweet: Tweet }) => {
  const profileImageUrl = getProfileImageUrl(tweet);
  const displayName = getDisplayName(tweet);
  const username = getUsername(tweet);

  return (
    <div className="flex items-center gap-4">
      <Link href="/archive" className="rounded-full">
        <ProfilePicture url={profileImageUrl} />
      </Link>
      <Link href="/archive" className="hover:underline">
        <ProfileName displayName={displayName} username={username} />
      </Link>
    </div>
  );
};

const ProfileCard = ({ tweet }: { tweet: Tweet }) => {
  const profileImageUrl = getProfileImageUrl(tweet);
  const displayName = getDisplayName(tweet);
  const username = getUsername(tweet);

  return (
    <div className="flex flex-col gap-2"> 
      <div className="flex items-center gap-4">
        <ProfilePicture url={profileImageUrl} />
        <ProfileName displayName={displayName} username={username} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">
          {tweet.user?.description || "no bio."}
        </span>
        <div className="flex gap-2">
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold">{formattedLargeNumber(tweet.user?.friends_count || 0)}</span> Following
          </span>
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold">{formattedLargeNumber(tweet.user?.followers_count || 0)}</span> Followers
          </span>
        </div>
        {tweet.user?.created_at && (
          <span className="text-sm text-muted-foreground">Account created: {new Date(tweet.user.created_at).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default function Profile({ tweet }: { tweet: Tweet }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <InlineProfile tweet={tweet} />
      </HoverCardTrigger>
      <HoverCardContent className="max-w-lg w-80 select-none">
        <ProfileCard tweet={tweet} />
      </HoverCardContent>
    </HoverCard>
  );
}
