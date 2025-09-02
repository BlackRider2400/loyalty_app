"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ROUTES } from "@/constants/routes";
import ClubFooter from "@/components/ClubFooter";
import QrScanner from "@/components/QRcode/Skanner";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ScannerPage() {
    const [lastCode, setLastCode] = useState<string>("");

    return (
        <div className="min-h-screen flex flex-col">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <Link href={ROUTES.CLUB_HOME}>
                    <Image
                        src="/icons/arrow.svg"
                        alt="back"
                        width={24}
                        height={24}
                    />
                </Link>
                <h1 className="text-[20px] font-semibold text-white">
                    Scan QR code
                </h1>
                <AlertDialog>
                    <AlertDialogTrigger className="w-6 h-6 flex-center">
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
                                Scanning members’ codes
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Point the camera at a member’s QR. After a
                                successful scan, you can mark a purchase or
                                court rental and award RallyCoins.
                                <br />
                                <br />
                                This is UI-only — we’ll wire awarding logic to
                                your backend later.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-center gap-2 flex-row">
                            <AlertDialogCancel className="flex-1">
                                Got it
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>

            <main className="flex-1 bg-primary-blue p-4">
                <div className="max-w-md mx-auto space-y-4">
                    {/* Wrap Scanner to capture the latest code via DOM observer */}
                    <div className="rounded-2xl overflow-hidden border-2 border-primary-orange bg-white p-2">
                        {/* We keep your Skanner component exactly, and read its text via MutationObserver? 
                Simpler: we accept manual confirm below. */}
                        <QrScanner />
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-neutral-200">
                        <p className="text-sm text-neutral-600">
                            After scan, tap “Confirm” to simulate awarding
                            coins.
                        </p>
                        <div className="mt-3 flex gap-2">
                            <Button
                                className="rounded-[14px] bg-light-blue hover:bg-primary-orange"
                                onClick={() => {
                                    toast.success(
                                        "Scan confirmed • 25 RallyCoins awarded"
                                    );
                                }}
                            >
                                Confirm (demo)
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-[14px]"
                                onClick={() => {
                                    setLastCode(new Date().toISOString());
                                    toast("Saved to local history (demo)");
                                }}
                            >
                                Save
                            </Button>
                        </div>
                    </div>

                    {lastCode ? (
                        <p className="text-xs text-white/80 text-center">
                            Last action: {lastCode}
                        </p>
                    ) : null}
                </div>
            </main>

            <ClubFooter />
        </div>
    );
}
