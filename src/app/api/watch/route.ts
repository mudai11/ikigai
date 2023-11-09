import { ANIME } from "@consumet/extensions";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const provider = url.searchParams.get("provider");
    if (!id) return new Response("Please provide a valid episode id.");
    if (!provider) return new Response("Please provide a valid provider.");
    if (provider === "enime") {
      const enime = new ANIME.Enime();
      const data = await enime.fetchEpisodeSources(id);
      return new Response(JSON.stringify(data));
    } else if (provider === "gogoanime") {
      const gogoanime = new ANIME.Gogoanime();
      const data = await gogoanime.fetchEpisodeSources(id);
      return new Response(JSON.stringify(data));
    } else {
      const zoro = new ANIME.Zoro();
      const data = await zoro.fetchEpisodeSources(id);
      return new Response(JSON.stringify(data));
    }
  } catch (err) {
    return new Response(
      `Could not get anime stream at the moment, try again later.`,
      {
        status: 500,
      }
    );
  }
}
