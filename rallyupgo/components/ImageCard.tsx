"use client";

import Image from "next/image";
import React from "react";

type ImageCardProps = {
    imgUrl: string;
    alt: string;
    text: string;
    active: boolean;
    onClick?: () => void;
    disabled?: boolean;
};

const ImageCard = ({
    imgUrl,
    alt,
    text,
    active,
    onClick,
    disabled,
}: ImageCardProps) => {
    const isDisabled = disabled || false;

    return (
        <div
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            onClick={isDisabled ? undefined : onClick}
            onKeyDown={(e) => {
                if (!isDisabled && (e.key === "Enter" || e.key === " "))
                    onClick?.();
            }}
            aria-disabled={isDisabled}
            className={[
                "relative ml-4 shrink-0 rounded-[16px] overflow-hidden select-none",
                active
                    ? "border-4 border-primary-orange"
                    : "border-4 border-transparent",
                isDisabled
                    ? "opacity-70 cursor-default"
                    : "cursor-pointer hover:opacity-95 transition",
            ].join(" ")}
        >
            <Image
                src={imgUrl}
                alt={alt ?? text}
                width={130}
                height={75}
                className="block"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-black/40" />
            {active && (
                <span className="absolute inset-0 bg-primary-orange/30" />
            )}
            <p className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-[14px] max-w-[120px] mx-auto text-center z-10 px-2">
                {text}
            </p>
        </div>
    );
};

export default ImageCard;
