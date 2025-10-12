import { proxyJson, clearSession } from "@/lib/serverApi";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        try {
            await proxyJson<string>("/auth/logout", { method: "POST" });
        } catch {}

        await clearSession();

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        await clearSession();
        return NextResponse.json({ ok: false }, { status: 200 });
    }
}
