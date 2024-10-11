import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function gracefullyTruncate(str: string): string {
  const maxLength = 40;
  const maxWordLength = 16;

  if (str.length <= maxLength) return str;
  
  let truncated = str.slice(0, maxLength);

  if (str[maxLength] !== ' ') {
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) truncated = truncated.slice(0, lastSpaceIndex);
  }

  if (truncated.length > 0 && truncated.length < str.length && (truncated.length - truncated.lastIndexOf(' ') - 1) < maxWordLength) truncated += '...';

  return truncated;
}

export function detectRetweet(text: string): boolean {
  return text.startsWith('RT @');
}

export function hasTcoLink(text: string): boolean {
  return text.includes('https://t.co/');
}

export function removeRetweetString(text: string): string {
  return text.replace(/^RT @\w+: /, '');
}

export function removeTcoLink(text: string): string {
  const tcoLinkRegex = /https:\/\/t\.co\/\w+/g;

  return text.replace(tcoLinkRegex, '').trim();
}