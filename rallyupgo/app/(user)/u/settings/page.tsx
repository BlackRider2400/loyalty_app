// app/u/settings/page.tsx
"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { toast } from "sonner"; // or your toast lib

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
        <div className="border-t-1 py-4 px-1 flex items-center justify-between">
            <div className="flex-center gap-[10px]">
                <Image src={imgUrl} alt={alt} width={24} height={24} />
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
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);

    async function handleLogout() {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Logout failed");
            toast?.success?.("Logged out");
        } catch (e) {
            toast?.info?.("Session cleared");
        } finally {
            router.replace("/");
            router.refresh();
            setIsLoggingOut(false);
        }
    }

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

                <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                        <Tile
                            alt="logout"
                            imgUrl="/icons/logout.svg"
                            text="Logout"
                        />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure you want to logout?
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-center gap-2 flex-row">
                            <AlertDialogCancel className="flex-1">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="flex-1 bg-primary-blue hover:bg-primary-orange disabled:opacity-50"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? "Logging out..." : "Continue"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>

            <Footer />
        </div>
    );
};

export default Settings;
