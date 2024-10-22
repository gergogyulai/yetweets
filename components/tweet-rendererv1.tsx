import React from "react";
import { detectRetweet, removeRetweetString, removeTcoLink } from "@/lib/utils";
import { type Entities, Url } from "@/lib/types";

const escapeHtml = (unsafeText: string) => {
  return unsafeText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const linkifyHashtags = (text: string) => {
  const hashtagRegex = /#[\w]+/g;
  return text.replace(hashtagRegex, (hashtag) => {
    const encodedHashtag = encodeURIComponent(hashtag.slice(1)); // Remove "#" and encode for URL safety
    return `<a href="https://twitter.com/hashtag/${encodedHashtag}" target="_blank" rel="noopener noreferrer">${hashtag}</a>`;
  });
};

const formatTextWithNewlines = (text: string) => {
  const escapedText = escapeHtml(text);
  const linkedText = linkifyHashtags(escapedText);

  return linkedText.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      <span dangerouslySetInnerHTML={{ __html: line }} />
      <br />
    </React.Fragment>
  ));
};

const renderUrls = (urls: Url[]) => {
  return urls.map((urlObj, index) => (
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

export default function TweetRendererV1({
  tweet,
  entities,
}: {
  tweet: string;
  entities?: Entities;
}) {
  const isRetweet = detectRetweet(tweet);

  let processedText = tweet;
  if (isRetweet) {
    processedText = removeRetweetString(processedText);
  }
  processedText = removeTcoLink(processedText);

  if (processedText.length === 0) return null;

  return (
    <div>
      {/* Format the tweet text with newlines and hashtags */}
      {formatTextWithNewlines(processedText)}
      {entities && renderUrls(entities.urls)}
    </div>
  );
}
