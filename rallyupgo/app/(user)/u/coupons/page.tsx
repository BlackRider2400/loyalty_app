"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import QrGenerator from "@/components/QRcode/Generator";
import {
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ClubCoupon = {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    priceCoins: number;
};

type ActiveCoupon = {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    code?: string;
};

const clubCoupons: ClubCoupon[] = [
    {
        id: "c1",
        title: "Coffee -50%",
        description: "Half-price coffee at reception.",
        imgUrl: "/images/largeImage.png",
        priceCoins: 150,
    },
    {
        id: "c2",
        title: "Squash Court -20%",
        description: "20% off next court rental.",
        imgUrl: "/images/largeImage.png",
        priceCoins: 400,
    },
    {
        id: "c3",
        title: "Protein Bar FREE",
        description: "Grab one free protein bar.",
        imgUrl: "/images/largeImage.png",
        priceCoins: 250,
    },
];

const activeCoupons: ActiveCoupon[] = [
    {
        id: "a1",
        title: "Coffee -50%",
        description: "Valid at the club café.",
        imgUrl: "/images/largeImage.png",
        code: "COF50-7KQ8",
    },
    {
        id: "a2",
        title: "Squash Court -10%",
        description: "One-time use on booking.",
        imgUrl: "/images/largeImage.png",
        code: "CRT10-2ZP4",
    },
];

function ClubCouponCard({ coupon }: { coupon: ClubCoupon }) {
    const handleBuy = () => {
        toast.success(
            `Purchased "${coupon.title}" for ${coupon.priceCoins} RallyCoins`
        );
    };

    return (
        <div className="rounded-2xl bg-white overflow-hidden shadow-sm border border-neutral-200">
            <div className="relative w-full h-36">
                <Image
                    src={coupon.imgUrl}
                    alt={coupon.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="text-primary-blue text-[16px] font-semibold leading-tight">
                    {coupon.title}
                </h3>
                <p className="text-[13px] text-neutral-600 mt-1">
                    {coupon.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icons/coins.svg"
                            alt="coins"
                            width={24}
                            height={24}
                            className="rotate-180"
                        />
                        <span className="text-primary-blue font-bold">
                            {coupon.priceCoins}
                        </span>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="rounded-[14px] bg-light-blue hover:bg-primary-orange">
                                Buy
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Confirm purchase
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Spend <b>{coupon.priceCoins} RallyCoins</b>{" "}
                                    to buy <b>{coupon.title}</b>?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-center gap-2 flex-row">
                                <AlertDialogCancel className="flex-1">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="flex-1 bg-primary-blue hover:bg-primary-orange"
                                    onClick={handleBuy}
                                >
                                    Confirm
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}

function ActiveCouponCard({ coupon }: { coupon: ActiveCoupon }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="rounded-2xl bg-white overflow-hidden shadow-sm border border-neutral-200">
                <div className="relative w-full h-36">
                    <Image
                        src={coupon.imgUrl}
                        alt={coupon.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-4">
                    <h3 className="text-primary-blue text-[16px] font-semibold leading-tight">
                        {coupon.title}
                    </h3>
                    <p className="text-[13px] text-neutral-600 mt-1">
                        {coupon.description}
                    </p>

                    {coupon.code ? (
                        <p className="mt-3 text-xs text-neutral-500">
                            Code:{" "}
                            <span className="font-mono">{coupon.code}</span>
                        </p>
                    ) : null}

                    <div className="mt-4 flex items-center justify-end">
                        <Button
                            className="rounded-[14px] bg-light-blue hover:bg-primary-orange"
                            onClick={() => setOpen(true)}
                        >
                            Active
                        </Button>
                    </div>
                </div>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
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
                </SheetContent>
            </Sheet>
        </>
    );
}

const CouponsPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-primary-blue">
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
                    Coupons
                </h1>
                <span className="w-6 h-6" />
            </section>

            <main className="flex-1 overflow-y-auto p-4 pb-28">
                <Tabs defaultValue="club" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 rounded-xl bg-[#1F4F79] p-0">
                        <TabsTrigger
                            value="club"
                            className="rounded-lg data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=inactive]:text-white/95"
                        >
                            Club coupons
                        </TabsTrigger>
                        <TabsTrigger
                            value="active"
                            className="rounded-lg data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=inactive]:text-white/95"
                        >
                            Active coupons
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="club" className="mt-5">
                        <div className="grid grid-cols-2 gap-4">
                            {clubCoupons.map((c) => (
                                <ClubCouponCard key={c.id} coupon={c} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="active" className="mt-5">
                        <div className="grid grid-cols-2 gap-4">
                            {activeCoupons.map((c) => (
                                <ActiveCouponCard key={c.id} coupon={c} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-40">
                <Footer />
            </div>
        </div>
    );
};

export default CouponsPage;
