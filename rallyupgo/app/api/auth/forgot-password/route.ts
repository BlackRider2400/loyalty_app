import { NextRequest, NextResponse } from "next/server";

type ParsedEmailObject = { email: string };

export async function POST(req: NextRequest) {
    try {
        const base = process.env.AUTH_API_BASE;
        if (!base) {
            return NextResponse.json(
                { error: "Server misconfigured: AUTH_API_BASE is missing." },
                { status: 500 }
            );
        }

        const ct = req.headers.get("content-type") || "";
        if (!ct.toLowerCase().includes("application/json")) {
            return NextResponse.json(
                { error: "Unsupported Media Type" },
                { status: 415 }
            );
        }

        const raw = await req.text();
        if (raw.length === 0) {
            return NextResponse.json({ error: "Empty body" }, { status: 400 });
        }
        if (raw.length > 10_000) {
            return NextResponse.json(
                { error: "Payload Too Large" },
                { status: 413 }
            );
        }

        let parsed: unknown;

        try {
            parsed = JSON.parse(raw);
        } catch {
            return NextResponse.json(
                { error: "Malformed JSON" },
                { status: 400 }
            );
        }

        let email: unknown;
        if (typeof parsed === "string") {
            email = parsed;
        } else if (
            parsed &&
            typeof (parsed as ParsedEmailObject).email === "string"
        ) {
            email = (parsed as ParsedEmailObject).email;
        } else {
            return NextResponse.json(
                {
                    error: "Expected a JSON string or an object with 'email' field",
                },
                { status: 400 }
            );
        }

        const e = String(email)
            .normalize("NFKC")
            .replace(/\u00A0/g, " ")
            .trim()
            .toLowerCase();

        if (!e || e.includes(" ") || /[\r\n\t]/.test(e)) {
            return NextResponse.json(
                { error: "Invalid email" },
                { status: 400 }
            );
        }
    } catch (err) {
        console.error("Forgot password proxy error:", err);
        return NextResponse.json(
            { error: "Forgot password proxy error." },
            { status: 502 }
        );
    }
}
