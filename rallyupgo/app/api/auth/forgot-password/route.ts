import { proxyJson } from "@/lib/serverApi";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
    try {
        const body = await req.text();

        const email =
            typeof body === "string"
                ? body.trim()
                : typeof body === "string"
                ? String(body).trim()
                : "";

        if (!email) {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        const msg = await proxyJson<string>(
            "/auth/forgot-password",
            {
                method: "POST",
                body: email,
            },
            false
        );

        return NextResponse.json(
            { message: msg || "Password reset link sent to your email" },
            { status: 200 }
        );
    } catch (e) {
        const error = e as { body?: string; status?: number };

        const status = error?.status ?? 500;
        const message =
            typeof error?.body === "string" && error.body.length
                ? error.body
                : status === 500
                ? "Internal Server Error"
                : "Request failed";
        return NextResponse.json({ error: message }, { status });
    }
}
