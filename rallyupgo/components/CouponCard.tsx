"use client";

import React from "react";
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import QrGenerator from "@/components/QRcode/Generator";

type Coupon = {
    id: string;
    location: string;
    title: string;
    description: string;
    imgUrl: string;
    priceCoins: number;
    code?: string;
};

const CouponCard = ({ coupon }: { coupon: Coupon }) => {
    if (!coupon.code) return <Card coupon={coupon} />;
    return (
        <Sheet>
            <SheetTrigger>
                <Card coupon={coupon} />
            </SheetTrigger>

            <SheetContent
                side="bottom"
                className="bg-primary-blue border-t border-primary-orange h-[90vh]"
            >
                <SheetHeader>
                    <SheetTitle className="text-white text-[32px] font-semibold">
                        {coupon.title}
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-6 mb-4 flex justify-center">
                    <div className="relative">
                        <div className="border-2 border-primary-orange rounded-[6px] bg-white p-3">
                            <QrGenerator
                                text={coupon.code ?? coupon.id}
                                size={260}
                            />
                        </div>

                        <span className="pointer-events-none absolute -top-4 -left-4 w-8 h-8 border-4 border-primary-orange border-b-0 border-r-0 rounded-tl-lg" />
                        <span className="pointer-events-none absolute -top-4 -right-4 w-8 h-8 border-4 border-primary-orange border-b-0 border-l-0 rounded-tr-lg" />
                        <span className="pointer-events-none absolute -bottom-4 -left-4 w-8 h-8 border-4 border-primary-orange border-t-0 border-r-0 rounded-bl-lg" />
                        <span className="pointer-events-none absolute -bottom-4 -right-4 w-8 h-8 border-4 border-primary-orange border-t-0 border-l-0 rounded-br-lg" />
                    </div>
                </div>

                <p className="text-center text-white text-sm opacity-90 mt-10">
                    Show this QR at reception to redeem your coupon.
                </p>

                <div className="mt-6 flex justify-center">
                    <SheetClose asChild>
                        <button className="rounded-md px-4 py-2 bg-white text-primary-blue">
                            Close
                        </button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CouponCard;

const Card = ({ coupon }: { coupon: Coupon }) => {
    return (
        <div
            className="relative overflow-hidden rounded-[16px] h-48 cursor-pointer data-[state=open]:pointer-events-none"
            role="button"
            tabIndex={0}
            aria-label={`Open coupon ${coupon.title}`}
        >
            <Image
                src={coupon.imgUrl}
                alt={coupon.title}
                fill
                className="object-cover"
            />

            <span aria-hidden="true" className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-3 flex gap-2 flex-col justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/icons/pin.svg"
                        width={16}
                        height={16}
                        alt="pin"
                    />
                    <p className="text-white">{coupon.location}</p>
                </div>
                <div className="self-center text-center mt-2">
                    <p className="text-white font-bold text-[24px] uppercase">
                        {coupon.title}
                    </p>
                    <p className="text-white text-[14px] font-medium">
                        {coupon.description}
                    </p>
                </div>
                <div className="flex items-end self-end gap-1 text-white">
                    <p className="text-[24px] font-bold">{coupon.priceCoins}</p>
                    <h1 className="font-extrabold text-[16px] mb-1 text-primary-orange">
                        Rally<span className="text-light-blue">Coins</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};
