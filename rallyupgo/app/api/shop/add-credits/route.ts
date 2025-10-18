import { NextRequest, NextResponse } from "next/server";
import { proxyJson } from "@/lib/serverApi";

interface QrCodeCreditsDTO {
    credits: number;
    uuid: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { uuid, credits } = body;

        if (!uuid || typeof uuid !== "string") {
            return NextResponse.json(
                { error: "Valid UUID is required" },
                { status: 400 }
            );
        }

        if (!credits || typeof credits !== "number" || credits <= 0) {
            return NextResponse.json(
                { error: "Credits must be a positive number" },
                { status: 400 }
            );
        }

        const dto: QrCodeCreditsDTO = {
            uuid,
            credits,
        };

        const response = await proxyJson<string>(
            "/api/shop/add-credits",
            {
                method: "POST",
                body: JSON.stringify(dto),
            },
            true
        );

        return NextResponse.json(
            { success: true, message: response },
            { status: 200 }
        );
    } catch (e) {
        const err = e as { status?: number; body?: string };

        const status = err.status || 500;
        let errorMessage = "Failed to add credits. Please try again.";

        if (status === 404) {
            errorMessage = "Client not found. Please verify the QR code.";
        } else if (status === 400) {
            errorMessage = "Invalid credit amount.";
        } else if (status === 401 || status === 403) {
            errorMessage = "Authentication required. Please log in again.";
        } else if (err.body) {
            errorMessage = err.body;
        }

        return NextResponse.json({ error: errorMessage }, { status });
    }
}
