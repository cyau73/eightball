import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    // Better Auth cookie names across HTTP/HTTPS/localhost
    const sessionCookie =
        request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__Secure-better-auth.session_token");

    const hasSession = !!sessionCookie?.value;

    // Protect root and dashboard routes
    if (pathName === "/" || pathName.startsWith("/dashboard")) {
        if (!hasSession) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Redirect authenticated users away from /login
    if (pathName === "/login") {
        if (hasSession) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};