import Image from "next/image";
import React from "react";

const SignIn = () => {
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
        </div>
    );
};

export default SignIn;
