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
}) => (
    <Sheet>
        <SheetTrigger asChild className="w-full">
            <div className="border-b-1 py-4 px-1 flex items-center justify-between">
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
            <SheetHeader>
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

export default function ClubTerms() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center px-3 relative">
                <Link href="/c/settings">
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
                    label="Club terms of service"
                    title="Terms of service"
                    content="Club access to the dashboard and scanner is provided for validating member activity. Abuse, scraping or resale of member data is prohibited."
                />
                <Tile
                    label="Data processing (club)"
                    title="Data processing"
                    content="Clubs view limited member identifiers during scanning. Personal data is processed based on legitimate interest to provide loyalty benefits."
                />
                <Tile
                    label="Coupon policy"
                    title="Coupon policy"
                    content="Coupons must accurately describe the benefit and redemption conditions. We reserve the right to hide misleading offers."
                />
            </section>
        </div>
    );
}
