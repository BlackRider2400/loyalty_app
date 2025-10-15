import { NextResponse } from "next/server";
import { proxyJson } from "@/lib/serverApi";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        let shopId: number | undefined;
        if (typeof body === "number") {
            shopId = body;
        } else if (body && typeof body.id === "number") {
            shopId = body.id;
        } else if (typeof body === "string") {
            const n = Number(body);
            if (Number.isFinite(n)) shopId = n;
        }

        if (!shopId || !Number.isFinite(shopId) || shopId <= 0) {
            return new NextResponse("Invalid shop ID.", {
                status: 400,
                headers: { "content-type": "text/plain; charset=utf-8" },
            });
        }

        const msg = await proxyJson<string>(
            "/api/client/select-shop",
            {
                method: "POST",
                body: JSON.stringify(shopId),
            },
            true
        );

        return new NextResponse(typeof msg === "string" ? msg : "OK", {
            status: 200,
            headers: {
                "content-type": "text/plain; charset=utf-8",
                "cache-control": "no-store",
            },
        });
    } catch (e) {
        const err = e as { status?: number; body?: string };
        const status = err.status ?? 500;
        const body = (err.body ?? "Internal Server Error") as string;
        return new NextResponse(body, {
            status,
            headers: { "content-type": "text/plain; charset=utf-8" },
        });
    }
}
