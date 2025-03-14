'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Tweet } from '@/lib/types'
import { extractProfileImageId, formattedLargeNumber } from '@/lib/utils'

const FALLBACK = {
  PROFILE_PICTURE_ID: 'cqNhNk6v',
  DISPLAY_NAME: 'Kanye West',
  USERNAME: '@kanyewest',
}

interface ProfileData {
  imageUrl: string
  displayName: string
  username: string
  description?: string
  friendsCount?: number
  followersCount?: number
  createdAt?: string
}

function getProfileData(tweet: Tweet): ProfileData {
  return {
    imageUrl: tweet.legacy_imported
      ? FALLBACK.PROFILE_PICTURE_ID
      : tweet.user?.profile_image_url_https
      ? extractProfileImageId(tweet.user.profile_image_url_https)
      : FALLBACK.PROFILE_PICTURE_ID,
    displayName: tweet.user?.name || FALLBACK.DISPLAY_NAME,
    username: tweet.user?.screen_name ? `@${tweet.user.screen_name}` : FALLBACK.USERNAME,
    description: tweet.user?.description,
    friendsCount: tweet.user?.friends_count,
    followersCount: tweet.user?.followers_count,
    createdAt: tweet.user?.created_at,
  }
}

const ProfilePicture = ({ url }: {url: string}) => (
  <Image
    src={`https://lp7x2l6b4majf9v9.public.blob.vercel-storage.com/profile_images/${url}.jpg`}
    alt="Profile Picture"
    width={45}
    height={45}
    className="rounded-full"
    loading="lazy"
  />
)

const ProfileName = ({ displayName, username }: {displayName: string, username: string}) => (
  <div className="flex flex-col">
    <span className="font-semibold leading-none tracking-tight">{displayName}</span>
    <span className="text-sm text-muted-foreground">{username}</span>
  </div>
)

const InlineProfile = ({ profileData } : { profileData: ProfileData}) => (
  <div className="flex items-center gap-4">
    <ProfilePicture url={profileData.imageUrl} />
    <ProfileName displayName={profileData.displayName} username={profileData.username} />
  </div>
)

const ProfileCard = ({ profileData } : {profileData : ProfileData}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-4">
      <ProfilePicture url={profileData.imageUrl} />
      <ProfileName displayName={profileData.displayName} username={profileData.username} />
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-sm text-muted-foreground">{profileData.description || 'no bio.'}</span>
      <div className="flex gap-2">
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold">{formattedLargeNumber(profileData.friendsCount || 0)}</span> Following
        </span>
        <span className="text-sm text-muted-foreground">
          <span className="font-semibold">{formattedLargeNumber(profileData.followersCount || 0)}</span> Followers
        </span>
      </div>
      {profileData.createdAt && (
        <span className="text-sm text-muted-foreground">
          Account created: {new Date(profileData.createdAt).toLocaleDateString()}
        </span>
      )}
    </div>
  </div>
)


const Profile: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const profileData = useMemo(() => getProfileData(tweet), [tweet])

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <InlineProfile profileData={profileData} />
      </HoverCardTrigger>
      <HoverCardContent className="w-80 max-w-lg select-none">
        <ProfileCard profileData={profileData} />
      </HoverCardContent>
    </HoverCard>
  )
}

export default React.memo(Profile)