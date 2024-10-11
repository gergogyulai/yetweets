import React from "react";
import { detectRetweet, removeRetweetString, removeTcoLink } from "@/lib/utils";

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

  return linkedText.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      <span dangerouslySetInnerHTML={{ __html: line }} />
      <br />
    </React.Fragment>
  ));
};

export default function TweetRenderer({ tweet }: { tweet: string }) {
  const isRetweet = detectRetweet(tweet);

  let processedText = tweet;
  if (isRetweet) {
    processedText = removeRetweetString(processedText);
  }
  processedText = removeTcoLink(processedText);

  return (
    <div>
      {formatTextWithNewlines(processedText)}
    </div>
  );
}