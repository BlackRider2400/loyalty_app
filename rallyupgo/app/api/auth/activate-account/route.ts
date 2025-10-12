import { proxyJson } from "@/lib/serverApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    try {
        const message = await proxyJson<string>(
            `/auth/activate-account?token=${encodeURIComponent(token)}`,
            { method: "GET" },
            false
        );

        return NextResponse.json({ message });
    } catch (e) {
        const error = e as { body?: string; status?: number };
        if (error?.status) {
            if (error.status === 400) {
                const msg =
                    typeof error.body === "string"
                        ? error.body
                        : "Invalid or expired token.";
                return NextResponse.json({ error: msg }, { status: 400 });
            }

            if (typeof error.body === "string") {
                return NextResponse.json(
                    { error: error.body },
                    { status: error.status }
                );
            }
            return NextResponse.json(
                { error: "Activation failed" },
                { status: error.status }
            );
        }

        return NextResponse.json(
            { error: "Activation failed" },
            { status: 500 }
        );
    }
}
