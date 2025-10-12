import { NextResponse } from "next/server";
import type { ClientUserDTO } from "@/lib/types";
import { proxyJson, proxyJsonReadOnly } from "@/lib/serverApi";

export async function GET() {
    try {
        const me = await proxyJsonReadOnly<ClientUserDTO>("/api/client/me", {
            cache: "no-store",
        });
        return NextResponse.json(me, { status: 200 });
    } catch (err) {
        const error = err as { body?: string; status?: number };
        const status = Number(error?.status) || 500;
        const body =
            typeof error?.body === "string"
                ? error.body
                : "Internal Server Error";
        return NextResponse.json(body, { status });
    }
}
