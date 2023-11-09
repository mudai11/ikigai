export type tmdbEpisode = {
  id: string;
  title: string;
  episode: number;
  season: number;
  releaseDate: string;
  description: string;
  url: string;
  img?: { mobile: string; hd: string };
};
