import Image from "next/image";
import React from "react";

const ImageCard = ({
    isLarge = false,
    imgUrl,
    alt,
    text,
}: {
    isLarge?: boolean;
    imgUrl: string;
    alt: string;
    text: string;
}) => {
    return (
        <div className="relative shrink-0 ml-4">
            <Image
                src={imgUrl}
                alt={alt}
                width={140}
                height={isLarge ? 208 : 126}
                className="rounded-[16px]"
            />
            <p className="absolute bottom-2 left-2 w-fit text-white max-w-[120px] font-extrabold text-[20px]">
                {text}
            </p>
        </div>
    );
};

export default ImageCard;
