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
import { Button } from "@/components/ui/button";
import ClubFooter from "@/components/ClubFooter";
import { ROUTES } from "@/constants/routes";

type TileProps = {
    label: string;
    title: string;
    content: React.ReactNode;
    pdfHref?: string;
    pdfLabel?: string;
};

const Tile = ({ label, title, content, pdfHref, pdfLabel }: TileProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild className="w-full">
                <Button
                    className="w-full !border-b border-white !rounded-none !bg-transparent py-8 px-1 flex items-center justify-between"
                    aria-label={label}
                >
                    <p className="text-white text-[14px]">{label}</p>
                    <Image
                        src="/icons/arrow.svg"
                        alt="open"
                        width={16}
                        height={16}
                        className="rotate-180"
                    />
                </Button>
            </SheetTrigger>

            <SheetContent className="w-full bg-primary-blue text-white border-none">
                <SheetHeader>
                    <SheetTitle className="text-white text-[20px] mb-4">
                        {title}
                    </SheetTitle>
                    <SheetDescription asChild>
                        <div className="text-white">
                            <div className="space-y-4">{content}</div>
                            {pdfHref && (
                                <div className="mt-6 pt-4 border-t border-white/20">
                                    <Link
                                        href={pdfHref}
                                        download
                                        className="underline underline-offset-4"
                                    >
                                        {pdfLabel ?? "Download PDF"}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

const ClubTermsAndPrivacyPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center px-3 relative">
                <Link href={ROUTES.CLUB_SETTINGS}>
                    <Image
                        src="/icons/arrow.svg"
                        width={24}
                        height={24}
                        alt="back"
                        className="absolute left-3 bottom-6"
                    />
                </Link>
                <h1 className="text-[20px] font-semibold text-white">
                    Terms & Conditions and Privacy Policy
                </h1>
            </section>

            <section className="flex-1 bg-primary-blue p-4">
                <Tile
                    label="Terms and Conditions (EN)"
                    title="Terms and Conditions (EN)"
                    pdfHref="/files/RallyUpGo_Terms_EN_NL.pdf"
                    pdfLabel="Download PDF (EN)"
                    content={
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>
                                Service provider: Rally Up Go (pilot project).
                            </li>
                            <li>
                                The app provides a loyalty program for racket
                                sports players.
                            </li>
                            <li>
                                Users earn Rally Coins once per day by checking
                                in at the club reception.
                            </li>
                            <li>
                                Exchange of Rally Coins for rewards is possible
                                only in participating clubs.
                            </li>
                            <li>
                                Clubs define the available rewards and their
                                costs.
                            </li>
                            <li>Users may delete their account at any time.</li>
                            <li>
                                We are not liable for technical interruptions or
                                errors beyond our control.
                            </li>
                            <li>
                                Applicable law: Dutch law (The Netherlands).
                            </li>
                        </ol>
                    }
                />

                <Tile
                    label="Privacy Policy (EN)"
                    title="Privacy Policy (EN)"
                    pdfHref="/files/RallyUpGo_Privacy_EN_NL.pdf"
                    pdfLabel="Download PDF (EN)"
                    content={
                        <>
                            <p>
                                <strong>Administrator:</strong> Rally Up Go
                                (pilot project).
                            </p>
                            <p>
                                <strong>We collect:</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Email address (for login and communication)
                                </li>
                                <li>Anonymous user ID (for statistics)</li>
                            </ul>
                            <p>
                                <strong>Purpose:</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>To enable login and account management</li>
                                <li>
                                    To provide loyalty program functionality
                                </li>
                                <li>
                                    To generate anonymous statistics for clubs
                                </li>
                            </ul>
                            <p>
                                <strong>Legal basis:</strong> Art. 6(1)(b) GDPR
                                – necessary for the performance of a contract.
                            </p>
                            <p>
                                <strong>Data sharing:</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>
                                    Clubs receive only aggregated and anonymous
                                    statistics.
                                </li>
                            </ul>
                            <p>
                                <strong>Data retention:</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Email is stored until account deletion.</li>
                                <li>
                                    Anonymous statistics remain only in
                                    aggregated form.
                                </li>
                            </ul>
                            <p>
                                <strong>Your rights:</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Access, correction, deletion of data</li>
                                <li>Restriction of processing</li>
                                <li>
                                    Complaint to the supervisory authority
                                    (Autoriteit Persoonsgegevens, NL).
                                </li>
                            </ul>
                        </>
                    }
                />
            </section>

            <ClubFooter />
        </div>
    );
};

export default ClubTermsAndPrivacyPage;
