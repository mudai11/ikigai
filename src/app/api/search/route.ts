import { aniAdvanceSearch } from "@/lib/anilistFetcher";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    if (!q) return new Response("Invalid query", { status: 400 });
    const data = await aniAdvanceSearch({
      search: q,
      type: "ANIME",
      genres: undefined,
      format: ["TV", "MOVIE", "TV_SHORT", "SPECIAL", "OVA", "ONA", "MUSIC"],
      page: 1,
      perPage: 10,
      sort: "POPULARITY_DESC",
    });
    return new Response(JSON.stringify(data));
  } catch (err) {
    return new Response(
      "Could not search anime at the moment, try again later.",
      {
        status: 500,
      }
    );
  }
}
