import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

export function getSubdomain(host: string | null | undefined) {
  if (typeof host !== "string" || host.trim() === "") return "";
  return host.replace(`.localhost:${process.env.PORT}`, "");
}

const SAFE_DOMAINS = [`localhost:${process.env.PORT}`];

// v5 middleware
// export default auth((request) => {
//   return middleware(request);
// });

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  let subdomain = getSubdomain(host);
  const path = url.pathname;
  console.log({
    "x-forwarded-host": request.headers.get("x-forwarded-host"),
    host: request.headers.get("host"),
    subdomain,
    path,
  });

  console.log({ subdomain, path });
  if (SAFE_DOMAINS.includes(subdomain)) {
    return NextResponse.next();
  }

  console.log("Request URL", request.url);
  const rewrite = NextResponse.rewrite(
    new URL(`/${subdomain}${path}`, request.url)
  );

  console.log(
    `Rewriting ${host} => ${rewrite.headers.get("x-middleware-rewrite")}`
  );

  return rewrite;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
