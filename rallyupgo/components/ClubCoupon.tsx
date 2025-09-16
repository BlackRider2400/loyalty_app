"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type Coupon = {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    priceCoins: number;
    code?: string;
};

const ClubCouponCard = ({ coupon }: { coupon: Coupon }) => {
    return (
        <div className="relative overflow-hidden rounded-[16px] h-52 cursor-pointer data-[state=open]:pointer-events-none">
            <Image
                src={coupon.imgUrl}
                alt={coupon.title}
                fill
                className="object-cover"
            />

            <span aria-hidden="true" className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-0 left-0 p-2 bg-white w-full flex-col flex">
                <div>
                    <h1 className="font-bold text-[18px] uppercase">
                        {coupon.title}
                    </h1>
                    <p className="font-semibold text-[14px]">
                        {coupon.description}
                    </p>
                </div>
                <div className="flex justify-between items-center px-2 py-1">
                    <p className="font-bold text-[16px]">
                        {coupon.priceCoins}{" "}
                        <span className="text-primary-orange">Rally</span>
                        <span className="text-light-blue">Coins</span>
                    </p>
                    <Link
                        href={`/c/coupons/${coupon.id}/edit`}
                        className="bg-light-blue px-4 py-1.5 rounded-full font-semibold text-[14px]"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClubCouponCard;
