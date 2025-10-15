import Image from "next/image";

const Tile = ({
    imgUrl,
    alt,
    text,
}: {
    imgUrl: string;
    alt: string;
    text: string;
}) => {
    return (
        <div className="border-t-1 py-4 px-1 flex items-center justify-between">
            <div className="flex-center gap-[10px]">
                <Image src={imgUrl} alt={alt} width={24} height={24} />
                <p className="text-white text-[16px]">{text}</p>
            </div>
            <Image
                src="/icons/arrow.svg"
                alt="arrow"
                width={16}
                height={16}
                className="rotate-180"
            />
        </div>
    );
};

export default Tile;
