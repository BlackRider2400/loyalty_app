import Link from "next/link";
const CheckEmail = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-primary-blue text-white">
            <div className="max-w-md w-full text-center space-y-6">
                <h1 className="text-2xl font-bold">Check your email</h1>
                <p className="opacity-80">
                    We have sent a message to your email address. Please check
                    your inbox.
                </p>

                <p className="opacity-50">
                    If you don&apos;t see the email, please check your spam or
                    junk folder.
                </p>

                <Link
                    href="/sign-in"
                    className="rounded-[12px] bg-light-blue px-5 py-3 font-semibold hover:bg-primary-orange"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default CheckEmail;
