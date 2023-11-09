export type aniGQSearchItemType = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  type: string;
  episodes: number;
  status: string;
  format: string[];
  season: string;
  description: string;
  genres: string[];
  coverImage: {
    extraLarge: string;
    large: string;
    color: string;
  };
};
