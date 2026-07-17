import { NextResponse, type NextRequest } from "next/server";
import { isSkin } from "@/components/skins/meta";
import { SKIN_COOKIE } from "@/lib/skin";

/**
 * `?skin=<nom>` dans l'URL = lien partageable avec un skin forcé :
 * on pose le cookie puis on redirige vers l'URL propre.
 */
export function proxy(request: NextRequest) {
  const skin = request.nextUrl.searchParams.get("skin");
  if (skin !== null && isSkin(skin)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("skin");
    const response = NextResponse.redirect(url);
    response.cookies.set(SKIN_COOKIE, skin, {
      path: "/",
      maxAge: 31_536_000,
      sameSite: "lax",
    });
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
