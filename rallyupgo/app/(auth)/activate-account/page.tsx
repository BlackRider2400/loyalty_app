"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type ApiOk = { message: string };
type ApiErr = { error: string };

const AccActivationPage = () => {
    const sp = useSearchParams();
    const token = sp.get("token");

    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >(token ? "loading" : "idle");
    const [msg, setMsg] = useState<string>("");

    useEffect(() => {
        if (!token) return;

        let aborted = false;

        (async () => {
            try {
                setStatus("loading");
                const res = await fetch(
                    `/api/auth/activate-account?token=${encodeURIComponent(
                        token
                    )}`
                );

                const data: ApiOk | ApiErr = await res.json();

                if (aborted) return;

                if (res.ok) {
                    setStatus("success");
                    setMsg(
                        ("message" in data && data.message) ||
                            "Account activated successfully"
                    );
                } else {
                    setStatus("error");
                    setMsg(
                        ("error" in data && data.error) || "Activation failed"
                    );
                }
            } catch {
                if (!aborted) {
                    setStatus("error");
                    setMsg("Network error. Please try again.");
                }
            }
        })();

        return () => {
            aborted = true;
        };
    }, [token]);

    if (!token) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-primary-blue text-white">
                <h1 className="text-2xl font-bold mb-4">
                    Activate your account
                </h1>
                <div className="max-w-md text-center space-y-6">
                    <p>
                        We&apos;ve sent you an email with an activation link.
                        Please check your inbox and click the link to verify
                        your account.
                    </p>
                    <p className="opacity-50">
                        Make sure to check your spam or junk folder if you
                        don&apos;t see the activation email.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Link
                            href="/sign-in"
                            className="rounded-[12px] bg-light-blue px-5 py-3 font-semibold hover:bg-primary-orange"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-primary-blue text-white">
            <div className="max-w-md w-full text-center space-y-6">
                {status === "loading" && (
                    <>
                        <h1 className="text-2xl font-bold">
                            Activating your account…
                        </h1>
                        <p className="opacity-80">Please wait a moment.</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h1 className="text-2xl font-bold">
                            Account activated 🎉
                        </h1>
                        <p className="opacity-90">{msg}</p>
                        <div className="flex gap-3 justify-center">
                            <Link
                                href="/sign-in"
                                className="rounded-[12px] bg-light-blue px-5 py-3 font-semibold hover:bg-primary-orange"
                            >
                                Go to Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccActivationPage;
