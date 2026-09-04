import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
    "https://sassy-eightball.vercel.app",      // Production Expo Web App
    "https://sassy-eightball-api.vercel.app",  // Production API Domain
    "https://mac-mini.tail0f16ec.ts.net:5000", // Local Tailscale Expo Web
    "https://mac-mini.tail0f16ec.ts.net:4000", // Local Tailscale API
    "http://localhost:8081",                    // Local Expo Web dev port
    "http://localhost:8082",                    // Local Metro bundler port
    "http://localhost:4001",                    // Local API dev port
];

export async function middleware(request: NextRequest) {
    const origin = request.headers.get("origin") || "";
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
    const corsOrigin = isAllowedOrigin ? origin : ALLOWED_ORIGINS[0];

    const pathName = request.nextUrl.pathname;

    // --- 1. CORS PREFLIGHT (OPTIONS) ---
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": corsOrigin,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-secret, x-user-seed",
                "Access-Control-Allow-Credentials": "true",
            },
        });
    }

    // --- 2. AUTH ROUTE GUARDS (Skip for /api) ---
    if (!pathName.startsWith("/api")) {
        const sessionCookie =
            request.cookies.get("better-auth.session_token") ||
            request.cookies.get("__Secure-better-auth.session_token");

        const hasSession = !!sessionCookie?.value;

        if (pathName === "/" || pathName.startsWith("/dashboard")) {
            if (!hasSession) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        if (pathName === "/login" && hasSession) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // --- 3. CORS HEADERS FOR API RESPONSES ---
    const response = NextResponse.next();

    if (pathName.startsWith("/api")) {
        response.headers.set("Access-Control-Allow-Origin", corsOrigin);
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-client-secret, x-user-seed");
        response.headers.set("Access-Control-Allow-Credentials", "true");
    }

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};