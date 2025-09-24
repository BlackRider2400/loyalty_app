import CouponCard from "@/components/CouponCard";
import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";

import { ROUTES } from "@/constants/routes";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserPage = () => {
    const clubs = [
        {
            id: 1,
            name: "11 Punkt",
            imgUrl: "/images/clubImage.jpg",
        },
        {
            id: 2,
            name: "Frans Otten Stadion",
            imgUrl: "/images/clubImage.jpg",
        },
        {
            id: 3,
            name: "Frans Otten Stadion",
            imgUrl: "/images/clubImage.jpg",
        },
    ];

    const AvailableCoupons: Coupon[] = [
        {
            id: "c1",
            title: "Abc -50%",
            location: "Frans Otten Station",
            description: "Half-price coffee at reception.",
            imgUrl: "https://mylovelyserver.fun:8443/rally-up-go/uploads/1758239054578_test_image.jpeg",
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
        <div className="flex flex-col items-center justify-center ">
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
                        Hi, User 1!
                    </h1>
                </div>
                <div className="flex flex-col items-start pb-4">
                    <div className="flex gap-3 items-center text-[32px] font-[800]">
                        <h1 className="text-white mt-2">
                            Your{" "}
                            <span className="text-primary-orange">Rally</span>
                            <span className="text-light-blue">Coins</span>
                        </h1>
                        <span className="text-white text-[40px]">2115</span>
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

            <section className="flex-1 bg-[#F8F9FB] w-full">
                <div className="w-full flex flex-col">
                    <h1 className="text-primary-blue text-[16px] font-semibold p-4">
                        View Each Club&apos;s Offer
                    </h1>
                    <div className="flex overflow-x-auto">
                        {clubs.map((club) => (
                            <ImageCard
                                key={club.id}
                                imgUrl={club.imgUrl}
                                alt={club.name}
                                text={club.name}
                                active={club.id === 1}
                            />
                        ))}

                        <div className="rounded-[16px] mx-4 relative flex-center bg-[#242B581A] min-w-[130px]">
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-black/40 rounded-[16px]"
                            />

                            <p className="text-white font-extrabold text-[10px] max-w-[120px] mx-auto text-center z-10">
                                More Coming Soon...
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col p-4">
                    <h1 className="text-primary-blue text-[16px] font-semibold mb-4">
                        Collect Coupons
                    </h1>
                    <div className="grid grid-cols-2 gap-4">
                        {AvailableCoupons.map((coupon, idx) => (
                            <CouponCard key={idx} coupon={coupon} />
                        ))}
                    </div>
                </div>
            </section>
            <div className="w-full h-[100px] bg-[#F8F9FB]">
                <Footer />
            </div>
        </div>
    );
};

export default UserPage;
