"use client";

import Link from "next/link";

const AccActivationPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-primary-blue text-white">
            <h1 className="text-2xl font-bold mb-4">Activate your account</h1>

            <div className="max-w-md text-center space-y-6">
                <p>
                    We&apos;ve sent you an email with an activation link. Please
                    check your inbox and click the link to verify your account.
                </p>
                <p className="opacity-50">
                    Make sure to check your spam or junk folder if you
                    don&apos;t see activation email
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
};

export default AccActivationPage;
