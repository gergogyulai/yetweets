import React, { type JSX } from "react";
import {
  removeRetweetString,
  removeTcoLink,
  isValidUrl,
  removeHorizonatalEllipsis,
} from "@/lib/utils";
import { type Entities, Url } from "@/lib/types";

const escapeHtml = (unsafeText: string): string => {
  return unsafeText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const linkifyHashtags = (text: string): string => {
  const hashtagRegex = /#[\w]+/g;
  return text.replace(hashtagRegex, (hashtag) => {
    const encodedHashtag = encodeURIComponent(hashtag.slice(1));
    return `<a href="https://twitter.com/hashtag/${encodedHashtag}" class=" hover:underline dark:text-blue-300 text-blue-800" target="_blank" rel="noopener noreferrer">${hashtag}</a>`;
  });
};

const linkifyMentions = (text: string): string => {
  const mentionRegex = /@\w+/g;
  return text.replace(mentionRegex, (mention) => {
    const encodedMention = encodeURIComponent(mention.slice(1));
    return `<a href="https://twitter.com/${encodedMention}" class=" hover:underline dark:text-blue-300 text-blue-800" target="_blank" rel="noopener noreferrer">${mention}</a>`;
  });
};

const formatTextWithNewlines = (text: string): JSX.Element[] => {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      <span dangerouslySetInnerHTML={{ __html: line }} />
      <br />
    </React.Fragment>
  ));
};

const processTweetText = (text: string): string => {
  let processedText = removeRetweetString(text);
  processedText = removeTcoLink(processedText);
  processedText = removeHorizonatalEllipsis(processedText);

  processedText = escapeHtml(processedText);
  processedText = linkifyHashtags(processedText);
  processedText = linkifyMentions(processedText);

  return processedText;
};

const renderUrls = (urls: Url[]): JSX.Element[] => {
  return urls
    .filter((url) => isValidUrl(url.expanded_url))
    .map((urlObj, index) => (
      <a
        key={index}
        href={urlObj.expanded_url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {urlObj.display_url}
      </a>
    ));
};

const divId =
  process.env.NODE_ENV === "development" ? "tweet-text-renderer" : undefined;

export default function TweetText({
  tweetText,
  entities,
  dontRenderUrls,
}: {
  tweetText: string;
  entities?: Entities;
  dontRenderUrls?: boolean;
}) {
  const processedTweetText = processTweetText(tweetText);
  if (!processedTweetText || processedTweetText.length === 0) return null;

  return (
    <div id={divId}>
      {formatTextWithNewlines(processedTweetText)}
      {!dontRenderUrls && entities?.urls && renderUrls(entities.urls)}
    </div>
  );
}
