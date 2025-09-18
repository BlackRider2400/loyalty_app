import React from "react";

import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import ClubCouponCard from "@/components/ClubCouponCard";
import ClubFooter from "@/components/ClubFooter";
import { Button } from "@/components/ui/button";

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

const HistoryCoupon: Coupon[] = [
    {
        id: "c4",
        title: "Yoga Class -30%",
        description: "30% off next yoga class.",
        imgUrl: "/images/coffee.jpg",
        priceCoins: 300,
        location: "",
        enabled: true,
    },
    {
        id: "c5",
        title: "Smoothie -20%",
        description: "20% off any smoothie.",
        imgUrl: "/images/coffee.jpg",
        priceCoins: 200,
        location: "",
        enabled: true,
    },
];

const ClubCouponsPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-primary-blue">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <Link href={ROUTES.CLUB_HOME}>
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
                <Tabs defaultValue="All" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 rounded-2xl bg-[#1F4F79] h-12 p-1">
                        <TabsTrigger
                            value="All"
                            className="text-[16px] font-bold rounded-[12px] border-none data-[state=active]:!bg-primary-blue data-[state=active]:!text-white data-[state=inactive]:!text-white/60"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="Active"
                            className="text-[16px] font-bold rounded-[12px] border-none data-[state=active]:!bg-primary-blue data-[state=active]:!text-white data-[state=inactive]:!text-white/60"
                        >
                            Active
                        </TabsTrigger>
                        <TabsTrigger
                            value="Inactive"
                            className="text-[16px] font-bold rounded-[12px] border-none data-[state=active]:!bg-primary-blue data-[state=active]:!text-white data-[state=inactive]:!text-white/60"
                        >
                            Inactive
                        </TabsTrigger>
                    </TabsList>

                    <Link href={ROUTES.CLUB_ADD_COUPON}>
                        <Button className="bg-primary-orange hover:bg-light-blue text-white text-[18px] font-semibold rounded-2xl h-12 w-full mt-4">
                            Add New Coupon +
                        </Button>
                    </Link>

                    <TabsContent value="All" className="mt-4">
                        <div className="flex flex-col gap-6">
                            {AvailableCoupons.map((c) => (
                                <ClubCouponCard key={c.id} coupon={c} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="Active" className="mt-4">
                        <div className="flex flex-col gap-6">
                            {HistoryCoupon.map((c) => (
                                <ClubCouponCard key={c.id} coupon={c} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="Inactive" className="mt-4">
                        <div className="flex flex-col gap-6">
                            {HistoryCoupon.map((c) => (
                                <ClubCouponCard key={c.id} coupon={c} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <div className="fixed bottom-0 left-0 z-40">
                <ClubFooter />
            </div>
        </div>
    );
};

export default ClubCouponsPage;
