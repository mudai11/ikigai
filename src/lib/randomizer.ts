import { tmdbSearch } from "@/types/tmdbSearch";
import axios from "axios";
import { generateAnilistMeta } from "@/helpers/functions/anilist-meta";

export const randomAnimeTitle = async () => {
  try {
    const anilist = generateAnilistMeta();
    const data = await anilist.fetchPopularAnime(1, 10);
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomAnime = data.results[randomIndex];
    return {
      id: randomAnime.id,
      english:
        typeof randomAnime.title === "string"
          ? randomAnime.title
          : randomAnime.title.english,
      romaji:
        typeof randomAnime.title === "string"
          ? randomAnime.title
          : randomAnime.title.romaji,
    };
  } catch (err) {
    console.log(err);
  }
};

export const randomAnime = async () => {
  try {
    const random = await randomAnimeTitle();
    const { data: tmdbSearchResults } = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${
        random?.english
      }&api_key=${process.env.THEMVDB_KEY!}`
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
      const vinland = await getVinlandSagaTmdb();
      return vinland;
    }
    return {
      id: random?.id,
      image: desiredAnime.backdrop_path,
      name: random?.romaji,
      description: desiredAnime.overview,
    };
  } catch (err) {
    const vinland = await getVinlandSagaTmdb();
    return vinland;
  }
};

const getVinlandSagaTmdb = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/88803?api_key=${process.env
        .THEMVDB_KEY!}`,
      { params: { type: "tv" } }
    );
    const desiredAnime = data;
    return {
      id: "101348",
      image: desiredAnime.backdrop_path,
      name: desiredAnime.name,
      description: desiredAnime.overview,
    };
  } catch (err) {
    console.log(err);
  }
};
