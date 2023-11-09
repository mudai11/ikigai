export type anilistType = {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  image: string;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  description: string;
  status: string;
  cover: string;
  rating: number;
  releasedDate: number;
  color: string;
  genres: string[];
  totalEpisodes: number;
  duration: number;
  type: string;
};
