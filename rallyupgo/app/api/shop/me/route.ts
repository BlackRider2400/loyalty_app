import { proxyJson, proxyJsonReadOnly } from "@/lib/serverApi";
import { ShopUserDTO } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const shopUser = await proxyJsonReadOnly<ShopUserDTO>(
            "/api/shop/me",
            { method: "GET" },
            true
        );

        return NextResponse.json(shopUser, { status: 200 });
    } catch (e) {
        const err = e as { message?: string; status?: number; body?: string };
        const status = err?.status || 500;
        const message = err?.body || err?.message || "Unknown error";

        return NextResponse.json({ error: message }, { status });
    }
}
