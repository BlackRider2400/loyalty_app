import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

import React from "react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const Tile = ({
    label,
    title,
    content,
}: {
    label: string;
    title: string;
    content: string;
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild className="w-full">
                <div className=" border-b-1 py-4 px-1 flex items-center justify-between">
                    <p className="text-white text-[14px]">{label}</p>

                    <Image
                        src="/icons/arrow.svg"
                        alt="arrow"
                        width={16}
                        height={16}
                        className="rotate-180"
                    />
                </div>
            </SheetTrigger>
            <SheetContent className="w-full bg-primary-blue">
                <SheetHeader className="">
                    <SheetTitle className="text-white text-[20px] mb-8">
                        {title}
                    </SheetTitle>
                    <SheetDescription className="text-white">
                        {content}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

const Terms = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center px-3 relative">
                <Link href="/u/settings">
                    <Image
                        src="/icons/arrow.svg"
                        width={24}
                        height={24}
                        alt="back"
                        className="absolute left-3 bottom-6"
                    />
                </Link>
                <h1 className="text-[20px] font-semibold text-white">
                    Privacy Information
                </h1>
            </section>

            <section className="flex-1 bg-primary-blue p-4">
                <Tile
                    label="Terms of use of the application “TBI Buy” and “TBI Buy” card"
                    title="Terms of use"
                    content="By using the TBI Buy application and card, you agree to comply with all applicable laws and regulations. The app is provided for personal use only. Unauthorized use, reproduction, or distribution of the app or its content is prohibited."
                />
                <Tile
                    label="“TBI Buy” Loyalty program rules"
                    title="Loyalty program rules"
                    content="The TBI Buy Loyalty Program allows users to earn points for eligible purchases. Points can be redeemed for rewards as described in the app. Program participation is subject to change or termination at any time."
                />
                <Tile
                    label="Privacy policy"
                    title="Privacy policy"
                    content="We collect and process your personal data to provide and improve our services. Your information is stored securely and is not shared with third parties except as required by law. You can review, update, or delete your data at any time."
                />
                <Tile
                    label="Cookie policy"
                    title="Cookie policy"
                    content="The TBI Buy app uses cookies to enhance user experience and analyze usage. You may disable cookies in your device settings, but some features may not function properly without them."
                />
            </section>

            <Footer />
        </div>
    );
};

export default Terms;
