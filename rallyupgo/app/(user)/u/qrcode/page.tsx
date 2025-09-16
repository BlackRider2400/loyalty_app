import Footer from "@/components/Footer";
import QrGenerator from "@/components/QRcode/Generator";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const page = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <Link href={ROUTES.USER_HOME}>
                    <Image
                        src="/icons/arrow.svg"
                        alt="Arrow"
                        width={24}
                        height={24}
                    />
                </Link>

                <h1 className="text-[20px] font-semibold text-white">
                    Generated QR code
                </h1>

                <div>
                    <AlertDialog>
                        <AlertDialogTrigger className="w-full">
                            <Image
                                src="/icons/infoIcon.svg"
                                alt="info"
                                width={24}
                                height={24}
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Your QR code
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    RallyCoins are rewarded when your QR code is
                                    scanned. Simply generate your personal QR
                                    code and let others scan it to earn points
                                    directly on your account.
                                    <br />
                                    <br />
                                    You can also collect RallyCoins by making
                                    purchases at the reception and renting
                                    squash courts.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-center gap-2 flex-row">
                                <AlertDialogCancel className="flex-1">
                                    Got it
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </section>
            <section className="flex-1 bg-primary-blue flex-center">
                <div className="relative">
                    <div className="border-2 border-primary-orange rounded-[6px]">
                        <QrGenerator />
                    </div>

                    <span
                        className="pointer-events-none absolute -top-6 -left-6 w-12 h-12
                 border-4 border-primary-orange border-b-0 border-r-0 rounded-tl-lg"
                    />
                    <span
                        className="pointer-events-none absolute -top-6 -right-6 w-12 h-12
                 border-4 border-primary-orange border-b-0 border-l-0 rounded-tr-lg"
                    />
                    <span
                        className="pointer-events-none absolute -bottom-6 -left-6 w-12 h-12
                 border-4 border-primary-orange border-t-0 border-r-0 rounded-bl-lg"
                    />
                    <span
                        className="pointer-events-none absolute -bottom-6 -right-6 w-12 h-12
                 border-4 border-primary-orange border-t-0 border-l-0 rounded-br-lg"
                    />
                </div>
            </section>

            <div className="w-full h-[100px] bg-primary-blue">
                <Footer />
            </div>
        </div>
    );
};

export default page;
