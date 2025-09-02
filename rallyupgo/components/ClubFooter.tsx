"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Item = ({
    href,
    label,
    icon,
    activeIcon,
}: {
    href: string;
    label: string;
    icon: string;
    activeIcon: string;
}) => {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <Link
            href={href}
            className="flex-center h-full flex-1 flex-col gap-1 bg-white rounded-none"
        >
            <Image
                src={active ? activeIcon : icon}
                width={24}
                height={24}
                alt={label}
            />
            <span
                className={`text-[14px] font-bold ${
                    active ? "text-[#ff4d2f]" : "text-black"
                }`}
            >
                {label}
            </span>
        </Link>
    );
};

const ClubFooter = () => {
    return (
        <section className="bg-white w-full h-[100px] flex-center">
            <Item
                href="/c"
                label="Home"
                icon="/icons/home.svg"
                activeIcon="/icons/home-active.svg"
            />
            <Item
                href="/c/scanner"
                label="Scanner"
                icon="/icons/qrcode.svg"
                activeIcon="/icons/qrcode-active.svg"
            />
            <Item
                href="/c/coupons"
                label="Coupons"
                icon="/icons/coupon.svg"
                activeIcon="/icons/coupon-active.svg"
            />
        </section>
    );
};

export default ClubFooter;
