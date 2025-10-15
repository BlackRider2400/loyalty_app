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

import Tile from "@/components/Tile";
import Logout from "@/components/Logout";
import { proxyJsonReadOnly } from "@/lib/serverApi";
import { ClientUserDTO } from "@/lib/types";

const Settings = async () => {
    let user: { username?: string } = {};
    try {
        const me = await proxyJsonReadOnly<ClientUserDTO>("/api/client/me", {
            cache: "no-store",
        });
        user = { username: me.username };
    } catch (err) {
        const error = err as { body?: string; status?: number };
        const status = Number(error?.status) || 500;

        console.error(`Failed to load user profile (${status}):`, err);
    }

    // const user = { username: "JohnDoe" };
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
                            <span className="text-[18px]">{user.username}</span>
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

                <Sheet>
                    <SheetTrigger className="w-full">
                        <Tile
                            alt="qrcode"
                            imgUrl="/icons/qrcodeWhite.svg"
                            text="Get RallyCoins"
                        />
                    </SheetTrigger>
                    <SheetContent className="w-full bg-primary-blue border-none">
                        <SheetHeader>
                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <Sheet>
                    <SheetTrigger className="w-full">
                        <Tile
                            alt="contact"
                            imgUrl="/icons/contact.svg"
                            text="Contact Us"
                        />
                    </SheetTrigger>
                    <SheetContent className="w-full bg-primary-blue border-none">
                        <SheetHeader>
                            <SheetTitle className="text-white">
                                Contact Us
                            </SheetTitle>
                            <SheetDescription className="text-white">
                                Email: twojaStara69@gmail.com
                                <br />
                                Phone: 123-456-7890
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <Link href="/u/settings/terms">
                    <Tile
                        alt="scale"
                        imgUrl="/icons/scale.svg"
                        text="Privacy & Terms and Conditions"
                    />
                </Link>

                <Logout />
            </section>

            <Footer />
        </div>
    );
};

export default Settings;
