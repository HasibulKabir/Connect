import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    // if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    //     return NextResponse.redirect(new URL("/sign-in", request.url));
    // }

    return NextResponse.next();
}
