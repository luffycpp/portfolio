import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get("host");

    // Define your domains
    // You might want to use environment variables for these in production
    // but for now we'll hardcode the logic based on subdomains.

    // Adjust this check to match your actual deployment domains
    const adminSubdomain = "adminryan.eclipxse.space";
    const mainSubdomain = "ryan.eclipxse.space";

    // Check if we are on the admin subdomain
    // We check if the hostname starts with 'adminryan' or contains it to handle both
    // production (adminryan.eclipxse.space) and local testing with ports (e.g. adminryan.localhost:3000)
    const isAdmin = hostname?.includes("adminryan");

    if (isAdmin) {
        // If accessing the root of admin subdomain, verify if we need to rewrite to /admin
        // The user wants 'adminryan.eclipxse.space' to serve the content of '/admin'

        // Rewrite everything to /admin path if it's not already there
        // However, if the user navigates to /admin/something, we just want to keep it.
        // Ideally, we treat the 'admin' folder as the root of this subdomain.

        // 1. Rewrite URL to include /admin prefix
        url.pathname = `/admin${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    // Optional: Redirect root domain or other subdomains if needed
    // For now, next.js handles the main domain normally.

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
