import ResetPasswordPage from "@/components/forms/ResetPasswordForm";
import Image from "next/image";
import React from "react";

const ResetPassword = () => {
    return (
        <div className="min-h-screen flex flex-col bg-primary-blue">
            <section className="flex-center">
                <Image
                    src="/icons/logo.svg"
                    alt="logo"
                    width={250}
                    height={250}
                    className="my-8"
                />
            </section>

            <section className="p-4 w-full flex flex-col mt-20">
                <h1 className="mb-4 text-white text-[20px] font-bold">
                    Set a new password
                </h1>
                <ResetPasswordPage />
            </section>
        </div>
    );
};

export default ResetPassword;
