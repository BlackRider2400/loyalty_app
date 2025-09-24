import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/lib/serverApi";

export async function POST(req: NextRequest) {
    try {
        const raw = await req.json();

        const username = raw?.username;
        const email = raw?.email;
        const password = raw?.password;

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Missing username, email, or password." },
                { status: 400 }
            );
        }

        const backendPayload = { name: username, email, password };

        const message = await proxyJson<string>(
            "/auth/register",
            { method: "POST", body: JSON.stringify(backendPayload) },
            false
        );

        return NextResponse.json(
            { registered: true, message },
            { status: 201 }
        );
    } catch (e) {
        const error = e as { body?: string; status?: number };

        if (error?.status) {
            if (error.status === 409) {
                const msg =
                    typeof error.body === "string"
                        ? error.body
                        : "Email already in use.";
                return NextResponse.json({ error: msg }, { status: 409 });
            }

            if (typeof error.body === "string") {
                return new NextResponse(error.body, {
                    status: error.status,
                    headers: { "Content-Type": "text/plain" },
                });
            }
            return NextResponse.json(
                { error: "Registration failed" },
                { status: error.status }
            );
        }

        return NextResponse.json(
            { error: "Registration failed" },
            { status: 500 }
        );
    }
}
