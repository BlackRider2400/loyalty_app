import { NextResponse, NextResponse as NextRes } from "next/server";
import { proxyJsonReadOnly } from "@/lib/serverApi";
import type { ShopUserDTO } from "@/lib/types";

export async function GET() {
    try {
        const shops = await proxyJsonReadOnly<ShopUserDTO[]>(
            "/api/client/shops",
            { cache: "no-store" }
        );

        return NextResponse.json(shops);
    } catch (err) {
        const e = err as { status?: number; body?: string };
        const status = Number(e?.status) || 500;
        const message = e?.body || "Failed to fetch shops.";
        return new NextRes(message, { status });
    }
}
