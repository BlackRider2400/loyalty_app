"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import ClubFooter from "@/components/ClubFooter";
import React from "react";
import { Button } from "@/components/ui/button";

const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-white rounded-2xl p-4 flex-1 shadow-sm border border-neutral-200">
        <p className="text-neutral-500 text-xs">{label}</p>
        <p className="text-primary-blue text-2xl font-extrabold mt-1">
            {value}
        </p>
    </div>
);

export default function ClubHome() {
    return (
        <div className="min-h-screen flex flex-col">
            <section className="bg-primary-blue w-full flex flex-col px-4">
                <div className="flex-center items-center w-full relative">
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={220}
                        height={220}
                        className="my-6"
                    />
                    <Link href={ROUTES.CLUB_SETTINGS}>
                        <Image
                            src="/icons/settings.svg"
                            alt="settings"
                            width={24}
                            height={24}
                            className="absolute right-0"
                        />
                    </Link>
                </div>

                <div className="border-t-[1px] border-t-white">
                    <h1 className="my-2 text-start text-[28px] italic text-white font-bold tracking-[-0.43px]">
                        Hello, Frans Otten Stadion!
                    </h1>
                </div>

                <div className="py-4">
                    <Link href={ROUTES.CLUB_SCANNER}>
                        <Button className="bg-primary-orange hover:bg-light-blue text-white rounded-2xl h-12 w-full">
                            <Image
                                src="/icons/qrcodeWhite.svg"
                                alt="scan"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            Start scanning
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="flex-1 bg-[#F8F9FB] w-full p-4 space-y-6">
                <div className="flex gap-3">
                    <Stat label="Scans today" value="34" />
                    <Stat label="This week" value="182" />
                </div>

                <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-primary-blue text-[16px] font-semibold">
                            Your coupons
                        </h2>
                        <Link
                            href={ROUTES.CLUB_COUPONS}
                            className="text-light-blue text-sm font-semibold"
                        >
                            Manage
                        </Link>
                    </div>

                    <div className="flex overflow-x-auto">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative shrink-0 mr-4">
                                <Image
                                    src="/images/largeImage.png"
                                    alt="coupon"
                                    width={220}
                                    height={140}
                                    className="rounded-[16px]"
                                />
                                <p className="absolute bottom-2 left-2 w-fit text-white max-w-[180px] font-extrabold text-[18px]">
                                    Coffee -50%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ClubFooter />
        </div>
    );
}
