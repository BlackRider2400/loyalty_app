"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import ClubFooter from "@/components/ClubFooter";
import React from "react";
import { Button } from "@/components/ui/button";
import CouponCard from "@/components/CouponCard";
const ClubHome = () => {
    const AvailableCoupons: Coupon[] = [
        {
            id: "c1",
            title: "Abc -50%",
            location: "Frans Otten Station",
            description: "Half-price coffee at reception.",
            imgUrl: "/images/coffee.jpg",
            priceCoins: 150,
            code: "COF50-7KQ8",
            enabled: true,
        },
        {
            id: "c2",
            title: "Squash Court -20%",
            location: "Frans Otten Station",
            description: "20% off next court rental.",
            imgUrl: "/images/coffee.jpg",
            priceCoins: 400,
            code: "COF50-7KQ8",
            enabled: true,
        },
        {
            id: "c3",
            title: "Protein Bar FREE",
            location: "Frans Otten Station",
            description: "Grab one free protein bar.",
            imgUrl: "/images/coffee.jpg",
            priceCoins: 250,
            code: "COF50-7KQ8",
            enabled: true,
        },
    ];
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

                <div className="py-4 w-full flex gap-2.5">
                    <div className="flex-1 flex-center gap-2 bg-white rounded-2xl py-3 h-13">
                        <p className="flex-center flex-col leading-4 font-bold text-[14px]">
                            Scans <span>today: </span>
                        </p>
                        <p className="font-bold text-[22px]">34</p>
                    </div>
                    <div className="flex-1 flex-center gap-2 bg-white rounded-2xl py-3 h-13">
                        <p className="flex flex-col leading-4 font-bold text-[14px] ">
                            Scans <span>this week: </span>
                        </p>
                        <p className="font-bold text-[22px]">182</p>
                    </div>
                </div>

                <div className="w-full mb-6">
                    <Link href={ROUTES.CLUB_METRICS}>
                        <Button className="bg-light-blue hover:bg-primary-orange text-white text-[18px] font-semibold rounded-2xl h-12 w-full ">
                            View Detailed Metrics
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="flex-1 bg-[#F8F9FB] w-full p-4 space-y-6">
                <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-primary-blue text-[16px] font-semibold">
                            Your active coupons
                        </h2>
                        <Link
                            href={ROUTES.CLUB_COUPONS}
                            className="text-light-blue text-sm font-semibold"
                        >
                            Manage
                        </Link>
                    </div>
                    <Link href={ROUTES.CLUB_ADD_COUPON}>
                        <Button className="bg-primary-orange hover:bg-light-blue text-white text-[18px] font-semibold rounded-2xl h-10 w-full mb-4">
                            Add New Coupon +
                        </Button>
                    </Link>

                    <div className="grid grid-cols-2 gap-4">
                        {AvailableCoupons.map((coupon) => (
                            <CouponCard key={coupon.id} coupon={coupon} />
                        ))}
                    </div>
                </div>
            </section>
            <div className="w-full h-[100px] bg-[#F8F9FB]">
                <ClubFooter />
            </div>
        </div>
    );
};

export default ClubHome;
