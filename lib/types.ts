export interface Tweet {
  created_at: string;
  deleted: boolean;
  favorite_count: number;
  hashtags: string[];
  id: number;
  id_str: string;
  lang: string;
  legacy_imported: boolean;
  retrieved: string;
  retweet_count: number;
  source: string;
  text: string;
  urls: string[];
  user: {
    id: number;
  };
  user_mentions: string[];
}