import { generateAnilistMeta } from "@/helpers/functions/anilist-meta";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const provider = url.searchParams.get("provider");
    if (!id) return new Response("Please provide a valid anime id.");
    if (!provider)
      return new Response("Please provide a valid anime provider.");
    let anilist = generateAnilistMeta(provider);
    const res = await anilist.fetchAnimeInfo(id, false, false);
    return new Response(JSON.stringify(res.episodes));
  } catch (err) {
    const url = new URL(req.url);
    const provider = url.searchParams.get("provider");
    return new Response(
      `Could not get episodes from ${provider} at the moment, try again later or try another provider.`,
      {
        status: 500,
      }
    );
  }
}
