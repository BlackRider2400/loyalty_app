import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";

import { ROUTES } from "@/constants/routes";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserPage = () => {
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
                        <ImageCard
                            imgUrl="/images/clubImage.jpg"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
                        <ImageCard
                            imgUrl="/images/clubImage.jpg"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
                        <ImageCard
                            imgUrl="/images/clubImage.jpg"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
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
                        {[1, 2, 3, 3, 3, 1, 1, 1].map((_, idx) => (
                            <div
                                key={idx}
                                className="relative overflow-hidden rounded-[16px] h-40 sm:h-48"
                            >
                                <Image
                                    src="/images/coffee.jpg"
                                    alt="coffee"
                                    fill
                                    className="object-cover"
                                    // sizes="(min-width: 640px) 50vw, 50vw"
                                />

                                <span
                                    aria-hidden
                                    className="absolute inset-0 bg-black/20"
                                />

                                <div className="absolute inset-3 flex gap-2 flex-col justify-between">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/icons/pin.svg"
                                            width={16}
                                            height={16}
                                            alt="pin"
                                            className=""
                                        />
                                        <p className="text-white ">
                                            Frans Otten Staion
                                        </p>
                                    </div>
                                    <p className="text-white self-center font-bold text-[24px]">
                                        Coffee 50% Off
                                    </p>
                                    <div className="flex items-end self-end gap-1 text-white">
                                        <p className="text-[24px] font-bold">
                                            150
                                        </p>
                                        <p className="mb-1 text-primary-orange font-bold text-[14px]">
                                            Rally
                                            <span className="text-light-blue">
                                                Coins
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
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
