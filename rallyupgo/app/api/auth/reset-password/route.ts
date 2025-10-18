import { NextResponse } from "next/server";
import { proxyJson } from "@/lib/serverApi";

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        let token: string | undefined = searchParams.get("token") ?? undefined;

        const contentType = req.headers.get("content-type") || "";
        const raw = await req.text();

        let password: string | undefined;

        if (contentType.includes("application/json")) {
            try {
                const parsed = JSON.parse(raw);
                if (typeof parsed === "string") {
                    password = parsed;
                } else if (parsed && typeof parsed === "object") {
                    if (!token && typeof parsed.token === "string")
                        token = parsed.token;
                    if (typeof parsed.password === "string")
                        password = parsed.password;
                }
            } catch {
                password = raw;
            }
        } else {
            password = raw;
        }

        if (!token) {
            return NextResponse.json(
                { error: "Token is required." },
                { status: 400 }
            );
        }
        if (!password || password.trim().length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters." },
                { status: 400 }
            );
        }

        const msg = await proxyJson<string>(
            `/auth/reset-password?token=${encodeURIComponent(token)}`,
            {
                method: "POST",
                headers: { "content-type": "text/plain" },
                body: password.trim(),
            },
            false
        );

        return NextResponse.json(
            { message: msg || "Password changed successfully." },
            { status: 200 }
        );
    } catch (e) {
        const err = e as { body?: string; status?: number };
        const status = err?.status ?? 500;
        const message =
            typeof err?.body === "string" && err.body.length
                ? err.body
                : status === 500
                ? "Internal Server Error"
                : "Request failed";
        return NextResponse.json({ error: message }, { status });
    }
}
