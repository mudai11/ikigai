import axios from "axios";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const episode = url.searchParams.get("episode");
    if (!id) return new Response("Please provide a valid episode id.");
    if (!episode) return new Response("Please provide a valid episode.");
    const { data } = await axios.get(
      `https://api.aniskip.com/v2/skip-times/${id}/${episode}?types[]=ed&types[]=mixed-ed&types[]=mixed-op&types[]=op&types[]=recap&episodeLength=`
    );
    return new Response(JSON.stringify(data.results));
  } catch (err) {
    return new Response(
      `Could not get anime stream at the moment, try again later.`,
      {
        status: 500,
      }
    );
  }
}
