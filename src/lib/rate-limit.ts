export interface RateLimitContextBase {
  id: string;
  limit: number;
  timeframe: number;
  count: CountFn;
}

export interface RateLimitContext extends RateLimitContextBase {
  request: Request;
  response: Response;
  headers: readonly [string | null, string | null, string | null];
  onRateLimit: OnRateLimit;
}

export type RateLimitHandler = (
  request: Request,
  response?: Response
) => Promise<RateLimitResult> | RateLimitResult;

export type RateLimitResult =
  | (RateLimitContextBase & {
      request?: Request;
      response?: Response;
      headers?: RateLimitHeaders;
      onRateLimit?: OnRateLimit;
    })
  | Response;

export type RateLimitHeaders =
  | null
  | string
  | readonly [string | null, string | null, string | null];

export type OnRateLimit = (
  context: RateLimitContext
) => Response | Promise<Response>;

export type CountFn = (
  context: RateLimitContext & { key: string }
) => Promise<number | Response>;

function getHeaders(nameOrHeaders?: RateLimitHeaders) {
  nameOrHeaders = nameOrHeaders ?? "RateLimit";
  return !nameOrHeaders || typeof nameOrHeaders === "string"
    ? ([
        `X-${nameOrHeaders}-Limit`,
        `X-${nameOrHeaders}-Remaining`,
        `X-${nameOrHeaders}-Reset`,
      ] as const)
    : nameOrHeaders;
}

const rateLimited: OnRateLimit = ({ response }) => {
  return new Response("Too many requests, try again in a bit.", {
    status: 429,
    headers: {
      ...Object.fromEntries(response.headers),
      "Content-Type": "application/json",
    },
  });
};

async function rateLimit(context: RateLimitContext): Promise<Response> {
  let { headers, id, limit, timeframe, count, onRateLimit, response } = context;
  const time = Math.floor(Date.now() / 1000 / timeframe);
  const key = `${id}:${time}`;
  let countOrRes: number | Response;

  try {
    countOrRes = await count({ ...context, key });
  } catch (err) {
    console.error("Rate limit `count` failed with:", err);
    return response || new Response(null);
  }
  const h = countOrRes instanceof Response ? countOrRes.headers : new Headers();
  const remaining = countOrRes instanceof Response ? 0 : limit - countOrRes;
  const reset = (time + 1) * timeframe;

  if (headers[0]) h.set(headers[0], `${limit}`);
  if (headers[1]) h.set(headers[1], `${remaining < 0 ? 0 : remaining}`);
  if (headers[2]) h.set(headers[2], `${reset}`);
  if (countOrRes instanceof Response) return countOrRes;
  if (remaining < 0) {
    const res = await onRateLimit(context);
    headers.forEach((key) => {
      if (key) res.headers.set(key, h.get(key)!);
    });

    return res;
  }
  for (const [key, value] of h) {
    response.headers.set(key, value);
  }

  return response;
}

export const initRateLimit = (fn: RateLimitHandler) =>
  async function isRateLimited(request: Request, response?: Response) {
    const ctx = await fn(request, response);

    if (ctx instanceof Response) return ctx;

    return rateLimit({
      ...ctx,
      request: ctx.request ?? request,
      response: ctx.response ?? response ?? new Response(null),
      headers: getHeaders(ctx.headers),
      onRateLimit: ctx.onRateLimit ?? rateLimited,
    });
  };
