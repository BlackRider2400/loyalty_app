import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = new Set([
    "/",
    "/sign-in",
    "/sign-up",
    "/activate-account",
]);

function getRoles(req: NextRequest): string[] {
    const raw = req.cookies.get("roles")?.value;
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/assets") ||
        pathname.startsWith("/favicon") ||
        pathname.startsWith("/files") ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|txt|map)$/)
    ) {
        return NextResponse.next();
    }

    const roles = getRoles(req);
    const isAuthed = roles.length > 0;

    if (PUBLIC_PATHS.has(pathname)) {
        if (isAuthed && (pathname === "/sign-in" || pathname === "/sign-up")) {
            const dest = roles.includes("SHOP") ? "/c" : "/u";
            return NextResponse.redirect(new URL(dest, req.url));
        }
        return NextResponse.next();
    }

    if (!isAuthed) {
        const signin = new URL("/sign-in", req.url);
        signin.searchParams.set("next", pathname);
        return NextResponse.redirect(signin);
    }

    if (pathname.startsWith("/u")) {
        if (!roles.includes("CLIENT_USER")) {
            return NextResponse.redirect(new URL("/c", req.url));
        }
    } else if (pathname.startsWith("/c")) {
        if (!roles.includes("SHOP")) {
            return NextResponse.redirect(new URL("/u", req.url));
        }
    } else {
        // For any other *private* routes you may add later, choose a default landing per role
        // or just allow:
        // return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
      Run on everything except api route handlers unless you want to guard them too.
      If you *do* want to protect route handlers under /api, add '/api/:path*'
    */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};

// to enter /c with "CLIENT_USER" role
// import { NextRequest, NextResponse } from "next/server";

// const PUBLIC_PATHS = new Set([
//     "/",
//     "/sign-in",
//     "/sign-up",
//     "/activate-account",
// ]);

// function getRoles(req: NextRequest): string[] {
//     const raw = req.cookies.get("roles")?.value;
//     if (!raw) return [];
//     try {
//         const parsed = JSON.parse(raw);
//         return Array.isArray(parsed) ? parsed : [];
//     } catch {
//         return [];
//     }
// }

// export function middleware(req: NextRequest) {
//     const { pathname } = req.nextUrl;

//     if (
//         pathname.startsWith("/_next") ||
//         pathname.startsWith("/assets") ||
//         pathname.startsWith("/favicon") ||
//         pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|txt|map)$/)
//     ) {
//         return NextResponse.next();
//     }

//     const roles = getRoles(req);
//     const isAuthed = roles.length > 0;

//     if (PUBLIC_PATHS.has(pathname)) {
//         if (isAuthed && (pathname === "/sign-in" || pathname === "/sign-up")) {
//             const dest = roles.includes("SHOP") ? "/c" : "/u";
//             return NextResponse.redirect(new URL(dest, req.url));
//         }
//         return NextResponse.next();
//     }

//     if (!isAuthed) {
//         const signin = new URL("/sign-in", req.url);
//         signin.searchParams.set("next", pathname);
//         return NextResponse.redirect(signin);
//     }

//     // Restrict CLIENT_USER to only the /c path
//     if (roles.includes("CLIENT_USER")) {
//         // If the user with CLIENT_USER role tries to access any path other than /c, redirect them to /c
//         if (!pathname.startsWith("/c")) {
//             return NextResponse.redirect(new URL("/c", req.url));
//         }
//     } else if (pathname.startsWith("/u")) {
//         if (!roles.includes("CLIENT_USER")) {
//             return NextResponse.redirect(new URL("/c", req.url));
//         }
//     } else if (pathname.startsWith("/c")) {
//         if (!roles.includes("SHOP")) {
//             return NextResponse.redirect(new URL("/u", req.url));
//         }
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
