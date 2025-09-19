import Footer from "@/components/Footer";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ReadonlyRow = ({
    label,
    value,
    placeholder,
}: {
    label: string;
    value?: string;
    placeholder?: string;
}) => (
    <div className="space-y-2">
        <Label className="text-white">{label}</Label>
        <Input
            value={value ?? ""}
            placeholder={placeholder ?? ""}
            readOnly
            className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none opacity-90"
        />
    </div>
);

const ProfilePage = () => {
    const club = {
        username: "Frans Otten Stadion",
        email: "frans.otten@stadion.com",
        phone: "+48 123 456 789",
    };

    return (
        <div className="min-h-screen flex flex-col">
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
                    Profile
                </h1>
            </section>

            <section className="flex-1 bg-primary-blue p-4 py-8 space-y-5">
                <ReadonlyRow label="Username" value={club.username} />
                <ReadonlyRow label="Email" value={club.email} />

                <ReadonlyRow label="Phone" value={club.phone} />
            </section>

            <Footer />
        </div>
    );
};

export default ProfilePage;
