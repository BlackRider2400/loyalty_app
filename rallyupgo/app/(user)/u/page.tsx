import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
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
                        Hello, User 1!
                    </h1>
                </div>
                <div className="flex flex-col items-start">
                    <div className="flex gap-2 items-center text-[28px] font-[800]">
                        <h1 className=" text-primary-orange mt-2">
                            Rally<span className="text-light-blue">Coins</span>
                        </h1>
                        <span className="text-white text-[36px]">2115</span>
                        <Image
                            src="/icons/coins.svg"
                            alt="coins"
                            width={44}
                            height={44}
                            className="ml-2 rotate-180"
                        />
                    </div>
                    <button className="bg-light-blue btn-text rounded-[14px] py-1 px-4 flex-center my-5">
                        How to get RallyCoins
                        <Image
                            src="/icons/vector.svg"
                            alt="vector"
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    </button>
                </div>
            </section>

            <section className="flex-1 bg-[#F8F9FB] w-full">
                <div className="w-full flex flex-col">
                    <h1 className="text-primary-blue text-[16px] font-semibold p-4 ">
                        Search for clubs
                    </h1>
                    <div className="flex overflow-x-auto">
                        <ImageCard
                            imgUrl="/images/clubImage.png"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
                        <ImageCard
                            imgUrl="/images/clubImage.png"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
                        <ImageCard
                            imgUrl="/images/clubImage.png"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
                        <ImageCard
                            imgUrl="/images/clubImage.png"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
                        <ImageCard
                            imgUrl="/images/clubImage.png"
                            alt="club"
                            text="Frans Otten Stadion"
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <h1 className="text-primary-blue text-[16px] font-semibold p-4 ">
                        Coupons
                    </h1>
                    <div className="flex overflow-x-auto">
                        <ImageCard
                            imgUrl="/images/largeImage.png"
                            alt="coffee"
                            text="Coffee -50%"
                            isLarge
                        />
                        <ImageCard
                            imgUrl="/images/largeImage.png"
                            alt="coffee"
                            text="Coffee -50%"
                            isLarge
                        />
                        <ImageCard
                            imgUrl="/images/largeImage.png"
                            alt="coffee"
                            text="Coffee -50%"
                            isLarge
                        />
                        <ImageCard
                            imgUrl="/images/largeImage.png"
                            alt="coffee"
                            text="Coffee -50%"
                            isLarge
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default UserPage;
