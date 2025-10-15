import CouponCard from "@/components/CouponCard";
import Footer from "@/components/Footer";

import ShopScroller from "@/components/ShopScroller";

import { ROUTES } from "@/constants/routes";
import { proxyJsonReadOnly } from "@/lib/serverApi";
import { ClientUserDTO, ProductResponseDTO, ShopUserDTO } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserPage = async () => {
    let user: { balance?: number; username?: string } = {};
    let currentShopId: number | undefined;

    try {
        const me = await proxyJsonReadOnly<ClientUserDTO>("/api/client/me", {
            cache: "no-store",
        });
        user = { balance: me.balance, username: me.username };
        console.log("ME:", me);
        currentShopId = me.currentShopUserDTO?.id;
    } catch (err) {
        const error = err as { body?: string; status?: number };
        const status = Number(error?.status) || 500;
        console.error(`Failed to load user profile (${status}):`, err);
    }

    let shops: ShopUserDTO[] = [];
    let shopsError: string | null = null;
    try {
        shops = await proxyJsonReadOnly<ShopUserDTO[]>("/api/client/shops", {
            cache: "no-store",
        });
    } catch (e) {
        const err = e as { status?: number; body?: string };
        shopsError = err?.body || "Failed to load shops.";
        console.error(shopsError, e);
    }

    let products: ProductResponseDTO[] = [];
    let productsError: string | null = null;
    try {
        products = await proxyJsonReadOnly<ProductResponseDTO[]>(
            "/api/client/products",
            {
                cache: "no-store",
            }
        );
    } catch (e) {
        const err = e as { status?: number; body?: string };
        productsError = err?.body || "Failed to load products.";
        console.error(productsError, e);
    }

    const activeShopName =
        shops.find((s) => s.id === currentShopId)?.name || "Selected Club";

    const availableCoupons: Coupon[] = (products || []).map((p) => ({
        id: String(p.id),
        title: p.name,
        location: activeShopName,
        description: p.description || "",
        imgUrl: p.imageUrl || "/images/clubImage.jpg",
        priceCoins: p.price ?? 0,
        code: "",
        enabled: true,
    }));

    return (
        <div className="flex flex-col items-center justify-center">
            <section className="bg-primary-blue w-full flex flex-col px-4">
                <div className="flex-center items-center w-full relative">
                    <Image
                        src="/icons/logo.svg"
                        alt="logo"
                        width={250}
                        height={250}
                        className="my-8"
                    />
                    <Link href={ROUTES.USER_SETTINGS}>
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
                        Hi, {user.username}!
                    </h1>
                </div>
                <div className="flex flex-col items-start pb-4">
                    <div className="flex gap-3 items-center text-[32px] font-[800]">
                        <h1 className="text-white mt-2">
                            Your{" "}
                            <span className="text-primary-orange">Rally</span>
                            <span className="text-light-blue">Coins</span>
                        </h1>
                        <span className="text-white text-[40px]">
                            {user.balance}
                        </span>
                        <Image
                            src="/icons/coins.svg"
                            alt="coins"
                            width={48}
                            height={48}
                            className="rotate-180"
                        />
                    </div>
                </div>
            </section>

            <section className="flex-1 bg-[#F8F9FB] w-full pb-[350px]">
                <div className="w-full flex flex-col">
                    <h1 className="text-primary-blue text-[16px] font-semibold p-4">
                        View Each Club&apos;s Offer
                    </h1>

                    {!shopsError && shops.length > 0 ? (
                        <ShopScroller
                            shops={shops}
                            currentShopId={currentShopId}
                        />
                    ) : (
                        <div className="px-4 pb-2 text-sm text-red-600">
                            {shopsError ?? "No shops available."}
                        </div>
                    )}
                </div>
                <div className="w-full flex flex-col p-4">
                    <h1 className="text-primary-blue text-[16px] font-semibold mb-4">
                        Collect Coupons
                    </h1>

                    {productsError ? (
                        <div className="text-sm text-red-600">
                            {productsError}
                        </div>
                    ) : availableCoupons.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {availableCoupons.map((coupon, idx) => (
                                <CouponCard key={idx} coupon={coupon} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-slate-500">
                            No products in this club yet.
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default UserPage;
