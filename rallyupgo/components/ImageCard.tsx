import Image from "next/image";
import React from "react";

type ImageCardProps = {
    imgUrl: string;
    alt: string;
    text: string;
    ending?: boolean;
};

const ImageCard = ({ imgUrl, alt, text }: ImageCardProps) => {
    return (
        <div className="relative ml-4 shrink-0 rounded-[16px] overflow-hidden">
            <Image
                src={imgUrl}
                alt={alt ?? text}
                width={130}
                height={75}
                className="block"
            />

            <span aria-hidden="true" className="absolute inset-0 bg-black/40" />

            <p className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-[14px] max-w-[120px] mx-auto text-center z-10 px-2">
                {text}
            </p>
        </div>
    );
};

export default ImageCard;
