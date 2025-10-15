import { NextResponse } from "next/server";
import { proxyJson } from "@/lib/serverApi";
import type { ProductResponseDTO } from "@/lib/types";

export async function GET() {
    try {
        const products = await proxyJson<ProductResponseDTO[]>(
            "/api/client/products",
            { method: "GET" },
            true
        );

        return NextResponse.json(products, {
            headers: { "cache-control": "no-store" },
        });
    } catch (e) {
        const error = e as { status?: number; body?: string };
        const status = error.status ?? 500;
        const body = error.body ?? "Internal Server Error";
        return new NextResponse(body, {
            status,
            headers: { "content-type": "text/plain; charset=utf-8" },
        });
    }
}
