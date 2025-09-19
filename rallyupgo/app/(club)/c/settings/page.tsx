"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClubFooter from "@/components/ClubFooter";
import { ROUTES } from "@/constants/routes";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Row = ({ icon, label }: { icon: string; label: string }) => (
    <div className="border-t-1 py-4 px-1 flex items-center justify-between">
        <div className="flex-center gap-[10px]">
            <Image src={icon} alt={label} width={24} height={24} />
            <p className="text-white text-[16px]">{label}</p>
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

export default function ClubSettings() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center px-3">
                <h1 className="text-[20px] font-semibold text-white">
                    Settings
                </h1>
            </section>

            <section className="flex-1 bg-primary-blue px-4 py-8">
                <Link
                    href="/c/profile"
                    className="flex flex-center justify-between mb-6"
                >
                    <div className="flex-center gap-4">
                        <div className="bg-[#C4C4C4] size-16 flex-center rounded-full">
                            <Image
                                src="/icons/avatar.svg"
                                alt="Club Avatar"
                                width={24}
                                height={24}
                            />
                        </div>
                        <p className="flex flex-col text-white text-[12px] leading-[150%]">
                            Club
                            <span className="text-[18px]">
                                Frans Otten Stadion
                            </span>
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
                        <Row
                            icon="/icons/qrcodeWhite.svg"
                            label="Scanner tips"
                        />
                    </SheetTrigger>
                    <SheetContent className="w-full bg-primary-blue border-none">
                        <SheetHeader>
                            <SheetTitle className="text-white">
                                Scanner quick guide
                            </SheetTitle>
                            <SheetDescription className="text-white ">
                                • Ensure good lighting
                                <br />
                                • Keep QR fully in frame
                                <br />
                                • Use rear camera for better focus
                                <br />
                                <br />
                                We&apos;ll add device selection & torch toggle
                                later.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <Link href={ROUTES.CLUB_TERMS}>
                    <Row
                        icon="/icons/scale.svg"
                        label="Privacy & Terms and Conditions"
                    />
                </Link>

                <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                        <Row icon="/icons/logout.svg" label="Logout" />
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
                            <AlertDialogAction className="flex-1 bg-primary-blue hover:bg-primary-orange">
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>

            <ClubFooter />
        </div>
    );
}
