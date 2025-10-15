"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const FooterElement = ({
    icon,
    activeIcon,
    label,
    href,
}: {
    icon: string;
    activeIcon: string;
    label: string;
    href: string;
}) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className="flex-center h-full flex-col flex-1 gap-1 bg-white rounded-none"
        >
            {isActive ? (
                <Image src={activeIcon} height={24} width={24} alt={label} />
            ) : (
                <Image src={`${icon}`} height={24} width={24} alt={label} />
            )}

            <span
                className={`text-[14px] font-bold ${
                    isActive ? "text-[#ff4d2f]" : "text-black"
                }`}
            >
                {label}
            </span>
        </Link>
    );
};

const Footer = () => {
    return (
        <section className="w-full h-[100px] flex-center fixed bottom-0 left-0 right-0 ">
            <FooterElement
                icon="/icons/home.svg"
                activeIcon="/icons/home-active.svg"
                label="Home"
                href="/u"
            />
            <FooterElement
                icon="/icons/qrcode.svg"
                activeIcon="/icons/qrcode-active.svg"
                label="QR Code"
                href="/u/qrcode"
            />
            <FooterElement
                icon="/icons/coupon.svg"
                activeIcon="/icons/coupon-active.svg"
                label="Coupons"
                href="/u/coupons"
            />
        </section>
    );
};

export default Footer;
