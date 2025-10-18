import { proxyJson } from "@/lib/serverApi";
import { ProductResponseDTO } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();

        const title = form.get("title");
        const description = form.get("description");
        const priceCoins = form.get("priceCoins");

        const file = form.get("file");

        if (typeof title !== "string" || title.trim().length < 1) {
            return NextResponse.json(
                { error: "Missing title" },
                { status: 400 }
            );
        }
        if (typeof description !== "string" || description.trim().length < 1) {
            return NextResponse.json(
                { error: "Missing description" },
                { status: 400 }
            );
        }

        const price = Number(priceCoins);
        if (!Number.isFinite(price) || price < 0) {
            return NextResponse.json(
                { error: "Invalid priceCoins" },
                { status: 400 }
            );
        }

        const backendFd = new FormData();

        const product = {
            name: title,
            description,
            price,
        };

        backendFd.append(
            "product",
            new Blob([JSON.stringify(product)], { type: "application/json" })
        );

        if (file instanceof File && file.size > 0) {
            backendFd.append("image", file, file.name || "image");
        }

        const created = await proxyJson<ProductResponseDTO>(
            "/api/shop/products",
            {
                method: "POST",
                body: backendFd,
            },
            true
        );

        return NextResponse.json(created, { status: 200 });
    } catch (e) {
        const error = e as { message?: string; status?: number };
        const message = error?.message || "Unknown error";
        const status = error?.status || 500;
        return NextResponse.json({ error: message }, { status });
    }
}

export async function GET() {
    try {
        const products = await proxyJson<ProductResponseDTO[]>(
            "/api/shop/products",
            { method: "GET" },
            true
        );

        return NextResponse.json(products, { status: 200 });
    } catch (e) {
        const err = e as { message?: string; status?: number; body?: string };
        const status = err?.status || 500;
        const message = err?.body || err?.message || "Unknown error";
        return NextResponse.json({ error: message }, { status });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const form = await req.formData();

        const id = form.get("id");
        const title = form.get("title");
        const description = form.get("description");
        const priceCoins = form.get("priceCoins");
        const file = form.get("file");

        if (!id || typeof id !== "string") {
            return NextResponse.json(
                { error: "Missing product ID" },
                { status: 400 }
            );
        }

        if (typeof title !== "string" || title.trim().length < 1) {
            return NextResponse.json(
                { error: "Missing title" },
                { status: 400 }
            );
        }

        if (typeof description !== "string" || description.trim().length < 1) {
            return NextResponse.json(
                { error: "Missing description" },
                { status: 400 }
            );
        }

        const price = Number(priceCoins);
        if (!Number.isFinite(price) || price < 0) {
            return NextResponse.json(
                { error: "Invalid priceCoins" },
                { status: 400 }
            );
        }

        const backendFd = new FormData();

        const product = {
            id: Number(id),
            name: title,
            description,
            price,
        };

        backendFd.append(
            "product",
            new Blob([JSON.stringify(product)], { type: "application/json" })
        );

        if (file instanceof File && file.size > 0) {
            backendFd.append("image", file, file.name || "image");
        }

        const updated = await proxyJson<ProductResponseDTO>(
            `/api/shop/products/${id}`,
            {
                method: "PUT",
                body: backendFd,
            },
            true
        );

        return NextResponse.json(updated, { status: 200 });
    } catch (e) {
        const error = e as { message?: string; status?: number; body?: string };
        const status = error?.status || 500;
        const message = error?.body || error?.message || "Unknown error";
        return NextResponse.json({ error: message }, { status });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Missing product ID" },
                { status: 400 }
            );
        }

        await proxyJson(
            `/api/shop/products/${id}`,
            {
                method: "DELETE",
            },
            true
        );

        return NextResponse.json(
            { success: true, message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (e) {
        const error = e as { message?: string; status?: number; body?: string };
        const status = error?.status || 500;
        const message = error?.body || error?.message || "Unknown error";
        return NextResponse.json({ error: message }, { status });
    }
}
