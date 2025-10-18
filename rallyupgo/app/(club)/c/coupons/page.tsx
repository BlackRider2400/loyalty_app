"use client";

import React, { useEffect, useState } from "react";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClubCouponCard from "@/components/ClubCouponCard";
import ClubFooter from "@/components/ClubFooter";
import { Button } from "@/components/ui/button";
import type { ProductResponseDTO } from "@/lib/types";

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
    const [allCoupons, setAllCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ac = new AbortController();

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch("/api/shop/products", {
                    method: "GET",
                    cache: "no-store",
                    signal: ac.signal,
                });

                if (!res.ok) {
                    const j = await res.json().catch(() => ({}));
                    throw new Error(
                        j?.error || `Failed to load products (${res.status})`
                    );
                }

                const products = (await res.json()) as ProductResponseDTO[];

                const mapped: Coupon[] = products.map((p) => ({
                    id: String(p.id),
                    title: p.name,
                    description: p.description ?? "",
                    imgUrl: p.imageUrl || "/images/coffee.jpg",
                    priceCoins: Number(p.price) || 0,
                    location: "",
                    code: "",
                    enabled: true,
                }));

                setAllCoupons(mapped);
            } catch (e) {
                const err = e as { name?: string; message?: string };
                if (err.name !== "AbortError") {
                    setError(err.message || "Failed to fetch products");
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ac.abort();
    }, []);

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
                        <Button className="bg-primary-orange hover:bg-light-blue text-white text-[18px] font-semibold rounded-2xl h-12 w-full mt-4 cursor-pointer">
                            Add New Coupon +
                        </Button>
                    </Link>

                    <TabsContent value="All" className="mt-4">
                        {loading && (
                            <div className="text-white/80 text-center py-6">
                                Loading…
                            </div>
                        )}
                        {!loading && error && (
                            <div className="text-red-300 text-center py-6">
                                {error}
                            </div>
                        )}
                        {!loading && !error && (
                            <div className="flex flex-col gap-6">
                                {allCoupons.length > 0 ? (
                                    allCoupons.map((c) => (
                                        <ClubCouponCard key={c.id} coupon={c} />
                                    ))
                                ) : (
                                    <div className="text-white/80 text-center py-6">
                                        No products found.
                                    </div>
                                )}
                            </div>
                        )}
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
