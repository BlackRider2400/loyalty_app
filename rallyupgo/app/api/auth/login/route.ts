import { NextRequest, NextResponse } from "next/server";
import { proxyJson, setSession } from "@/lib/serverApi";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const data = await proxyJson<{
            token: string;
            refreshToken: string;
            roles?: string[];
            email?: string;
        }>(
            "/auth/login",
            { method: "POST", body: JSON.stringify(body) },
            false
        );

        await setSession(data);

        return NextResponse.json({
            authenticated: true,
            email: data.email ?? null,
            roles: data.roles ?? [],
        });
    } catch (e) {
        const error = e as { body?: string; status?: number };

        if (error?.status) {
            if (typeof error.body === "string") {
                return new NextResponse(error.body, {
                    status: error.status,
                    headers: { "Content-Type": "text/plain" },
                });
            }
            return NextResponse.json(
                { error: "Login failed" },
                { status: error.status }
            );
        }

        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
