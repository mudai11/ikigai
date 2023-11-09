import { MediaStatus } from "./mediaStatus";
import { tmdbEpisode } from "./tmdbEpisode";
import { tmdbSearch } from "./tmdbSearch";

export type tmdbInfo = {
  id: string;
  title: string;
  translations: {
    title: string;
    description: string;
    language: string;
  }[];
  image: string;
  cover: string;
  logos: {
    url: string;
    aspectRatio: number;
    width: number;
  }[];
  type: string;
  rating: number;
  releaseDate: string;
  description: string;
  genres: string[];
  duration: number;
  totalEpisodes: number;
  totalSeasons: number;
  directors: string[];
  writers: string[];
  actors: string[];
  trailer: {
    id?: string;
    site?: string;
    url?: string;
  };
  mappings: { imdb: string; tmdb: string };
  similar: tmdbSearch[];
  recommendations: tmdbSearch[];
  status: MediaStatus;
  production: string;
  casts: string[];
  tags: string[];
  seasons: {
    season: number;
    image?: { mobile: string; hd: string };
    episodes: tmdbEpisode[];
  }[];
  nextAiringEpisode: {
    season: number;
    episode: number;
    releaseDate: string;
    title: string;
    runtime: number;
  };
};
