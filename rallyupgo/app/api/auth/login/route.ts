import { NextResponse } from "next/server";

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    type: string;
    email: string;
    refreshToken: string;
    roles: string[];
}

export async function POST(req: Request) {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        return NextResponse.json(
            { error: "Invalid Content-Type. Expected application/json." },
            { status: 415 }
        );
    }

    let body: LoginPayload;
    try {
        body = (await req.json()) as LoginPayload;
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body." },
            { status: 400 }
        );
    }

    const { email, password } = body || {};
    if (!email || !password) {
        return NextResponse.json(
            { error: "Missing required fields: email, password." },
            { status: 400 }
        );
    }

    const base = process.env.AUTH_API_BASE;
    if (!base) {
        return NextResponse.json(
            { error: "Server misconfigured: AUTH_API_BASE is missing." },
            { status: 500 }
        );
    }

    const url = `${base}/auth/login`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
        const upstream = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "*/*",
            },
            body: JSON.stringify({ email, password }),
            signal: controller.signal,
            cache: "no-store",
        });

        clearTimeout(timeout);

        if (upstream.status === 401) {
            return NextResponse.json(
                { error: "Unauthorized - Invalid credentials" },
                { status: 401 }
            );
        }

        if (!upstream.ok) {
            const text = await upstream.text().catch(() => "");
            return NextResponse.json(
                {
                    error: "Login failed at upstream service.",
                    status: upstream.status,
                    details: text?.slice(0, 500) || undefined,
                },
                { status: upstream.status }
            );
        }

        const data = (await upstream.json()) as LoginResponse;

        if (!data?.token || !data?.refreshToken) {
            return NextResponse.json(
                { error: "Upstream did not return expected tokens." },
                { status: 502 }
            );
        }

        const res = NextResponse.json(
            {
                email: data.email,
                roles: data.roles ?? [],
                type: data.type ?? "Bearer",
                authenticated: true,
            },
            { status: 200 }
        );

        const isProd = process.env.NODE_ENV === "production";

        res.cookies.set("access_token", data.token, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60,
        });

        res.cookies.set("refresh_token", data.refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    } catch (err: unknown) {
        clearTimeout(timeout);
        const message = err instanceof Error ? err.message : "Unknown error";
        const aborted =
            message.toLowerCase().includes("aborted") ||
            message.toLowerCase().includes("abort");
        return NextResponse.json(
            {
                error: aborted
                    ? "Upstream request timed out."
                    : "Unexpected error during login.",
                details: message,
            },
            { status: aborted ? 504 : 500 }
        );
    }
}
