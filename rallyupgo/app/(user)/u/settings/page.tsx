import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const Tile = ({
    imgUrl,
    alt,
    text,
}: {
    imgUrl: string;
    alt: string;
    text: string;
}) => {
    return (
        <div className=" border-t-1 py-4 px-1 flex items-center justify-between">
            <div className="flex-center gap-[10px]">
                <Image
                    src={imgUrl}
                    alt={alt}
                    width={24}
                    height={24}
                    className=""
                />
                <p className="text-white text-[16px]">{text}</p>
            </div>
            <Image
                src="/icons/arrow.svg"
                alt="arrow"
                width={16}
                height={16}
                className="rotate-180"
            />
        </div>
    );
};

const Settings = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center px-3">
                <h1 className="text-[20px] font-semibold text-white">
                    Settings
                </h1>
            </section>

            <section className="flex-1 bg-primary-blue px-4 py-8">
                <Link
                    href="/u/profile"
                    className="flex flex-center justify-between mb-6"
                >
                    <div className="flex-center gap-4">
                        <div className="bg-[#C4C4C4] size-16 flex-center rounded-full">
                            <Image
                                src="/icons/avatar.svg"
                                alt="User Avatar"
                                width={24}
                                height={24}
                            />
                        </div>

                        <p className="flex flex-col text-white text-[12px] leading-[150%]">
                            Profile
                            <span className="text-[18px]">twojaStara69</span>
                        </p>
                    </div>
                    <Image
                        src="/icons/arrow.svg"
                        alt="arrow"
                        width={16}
                        height={16}
                        className="rotate-180"
                    />
                </Link>

                <Tile
                    alt="qrcode"
                    imgUrl="/icons/qrcodeWhite.svg"
                    text="Get RallyCoins"
                />
                <Tile
                    alt="contact"
                    imgUrl="/icons/contact.svg"
                    text="Contact Us"
                />
                <Tile
                    alt="scale"
                    imgUrl="/icons/scale.svg"
                    text="Privacy Policy"
                />
                <Tile alt="logout" imgUrl="/icons/logout.svg" text="Logout" />
            </section>

            <Footer />
        </div>
    );
};

export default Settings;
