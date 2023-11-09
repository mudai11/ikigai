import { tmdbSearch } from "@/types/tmdbSearch";
import axios from "axios";

export const posterFinder = async (title: string) => {
  try {
    const { data: tmdbSearchResults } = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${title}&api_key=${process
        .env.THEMVDB_KEY!}`
    );
    const results = tmdbSearchResults.results as tmdbSearch[];
    const animeOnlyResults = results.filter((result) => {
      if (result.genre_ids.includes(16)) return result;
    });
    const theAnime = animeOnlyResults[0];
    const id = theAnime.id;
    const { data: desiredAnime } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env
        .THEMVDB_KEY!}`,
      { params: { type: "tv" } }
    );
    if (desiredAnime === undefined) {
      return undefined;
    }
    return {
      image: desiredAnime.backdrop_path,
    };
  } catch (err) {
    return undefined;
  }
};
