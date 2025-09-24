import { cookies } from "next/headers";

const API_BASE = process.env.AUTH_API_BASE!;
const IS_PROD = process.env.NODE_ENV === "production";
const COOKIE_DOMAIN = process.env.SESSION_COOKIE_DOMAIN;

type RefreshDto = { refreshToken: string };
type JwtResponseDTO = {
    token: string;
    type?: string;
    email?: string;
    refreshToken?: string;
    roles?: string[];
};

const ACCESS = "access_token";
const REFRESH = "refresh_token";
const ROLES = "roles";

const baseCookieOpts = {
    httpOnly: true as const,
    secure: IS_PROD,
    sameSite: "lax" as const,
    path: "/",
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
};

export async function readTokens() {
    const c = await cookies();
    return {
        access: c.get(ACCESS)?.value,
        refresh: c.get(REFRESH)?.value,
    };
}

export async function setSession(dto: JwtResponseDTO) {
    const c = await cookies();

    c.set(ACCESS, dto.token, { ...baseCookieOpts, maxAge: 60 * 15 });

    if (dto.refreshToken) {
        c.set(REFRESH, dto.refreshToken, {
            ...baseCookieOpts,
            maxAge: 60 * 60 * 24 * 30,
        });
    }

    if (dto.roles) {
        c.set(ROLES, JSON.stringify(dto.roles), {
            sameSite: "lax",
            path: "/",
            secure: IS_PROD,
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 30,
            ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
        });
    }
}

export async function clearSession() {
    const c = await cookies();
    const clearOpts = { ...baseCookieOpts, maxAge: 0 };
    c.set(ACCESS, "", clearOpts);
    c.set(REFRESH, "", clearOpts);
    c.set(ROLES, "", {
        sameSite: "lax",
        path: "/",
        secure: IS_PROD,
        httpOnly: false,
        maxAge: 0,
        ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
    });
}

async function backendFetch(
    input: string,
    init: RequestInit = {},
    withAuth = true
) {
    const url = input.startsWith("http") ? input : `${API_BASE}${input}`;
    const h = new Headers(init.headers);
    const { access } = await readTokens();

    if (!h.has("Content-Type") && !(init.body instanceof FormData)) {
        h.set("Content-Type", "application/json");
    }
    if (withAuth && access) h.set("Authorization", `Bearer ${access}`);

    return fetch(url, { ...init, headers: h });
}

export async function proxyJson<T>(
    path: string,
    init: RequestInit = {},
    withAuth = true
): Promise<T> {
    let res = await backendFetch(path, init, withAuth);

    if (res.status === 401 || res.status === 403) {
        const { refresh } = await readTokens();
        if (!refresh) return await throwAsError(res);

        const r = await backendFetch(
            "/auth/refresh-token",
            {
                method: "POST",
                body: JSON.stringify({ refreshToken: refresh } as RefreshDto),
            },
            false
        );
        if (!r.ok) return await throwAsError(res);

        const data = (await r.json()) as JwtResponseDTO;

        await setSession({
            token: data.token,
            refreshToken: data.refreshToken ?? refresh,
            roles: data.roles,
        });

        res = await backendFetch(path, init, withAuth);
    }

    if (!res.ok) return await throwAsError(res);

    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json")
        ? ((await res.json()) as T)
        : ((await res.text()) as unknown as T);
}

async function throwAsError(res: Response): Promise<never> {
    const text = await res.text().catch(() => "");
    const message = text || `${res.status} ${res.statusText}`;
    throw { status: res.status, body: message };
}
