import Footer from "@/components/Footer";
import QrGenerator from "@/components/QRcode/Generator";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <Link href={ROUTES.USER_HOME}>
                    <Image
                        src="/icons/arrow.svg"
                        alt="Arrow"
                        width={24}
                        height={24}
                    />
                </Link>

                <h1 className="text-[20px] font-semibold text-white">
                    Generated QR code
                </h1>

                <Image
                    src="/icons/infoIcon.svg"
                    alt="info"
                    width={24}
                    height={24}
                />
            </section>
            <section className="flex-1 bg-primary-blue flex-center">
                <div className="relative">
                    <div className="border-2 border-primary-orange rounded-[6px]">
                        <QrGenerator />
                    </div>

                    <span
                        className="pointer-events-none absolute -top-6 -left-6 w-12 h-12
                 border-4 border-primary-orange border-b-0 border-r-0 rounded-tl-lg"
                    />
                    <span
                        className="pointer-events-none absolute -top-6 -right-6 w-12 h-12
                 border-4 border-primary-orange border-b-0 border-l-0 rounded-tr-lg"
                    />
                    <span
                        className="pointer-events-none absolute -bottom-6 -left-6 w-12 h-12
                 border-4 border-primary-orange border-t-0 border-r-0 rounded-bl-lg"
                    />
                    <span
                        className="pointer-events-none absolute -bottom-6 -right-6 w-12 h-12
                 border-4 border-primary-orange border-t-0 border-l-0 rounded-br-lg"
                    />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default page;
