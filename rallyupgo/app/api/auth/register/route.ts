import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const base = process.env.AUTH_API_BASE;
        if (!base) {
            return NextResponse.json(
                { error: "Server misconfigured: AUTH_API_BASE is missing." },
                { status: 500 }
            );
        }
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        const res = await fetch(`${base}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Swagger sugeruje Accept: */*, ale fetch i tak to wysyła.
                Accept: "*/*",
            },
            body: JSON.stringify({
                name: username,
                email,
                password,
            }),
        });

        // Backend może zwracać JSON albo czysty tekst — obsłużmy obie opcje:
        const contentType = res.headers.get("content-type") || "";
        const raw = contentType.includes("application/json")
            ? await res.json()
            : await res.text();

        // Zwróć dokładnie ten sam status co backend (201 przy sukcesie, 409 przy konflikcie itd.)
        if (typeof raw === "string") {
            return NextResponse.json({ message: raw }, { status: res.status });
        } else {
            return NextResponse.json(raw, { status: res.status });
        }
    } catch (err) {
        console.error("Registration proxy error:", err);
        return NextResponse.json(
            { error: "Registration proxy error." },
            { status: 502 }
        );
    }
}
