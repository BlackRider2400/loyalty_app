import ImageCard from "@/components/ImageCard";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
    const clubs = [
        {
            id: 1,
            name: "11 Punkt",
            imgUrl: "/images/clubImage.jpg",
        },
        {
            id: 2,
            name: "Frans Otten Stadion",
            imgUrl: "/images/clubImage.jpg",
        },
        {
            id: 3,
            name: "Frans Otten Stadion",
            imgUrl: "/images/clubImage.jpg",
        },
    ];
    return (
        <div className="min-h-screen flex flex-col bg-primary-blue">
            <section className="flex-center flex-col  px-4">
                <Image
                    src="/icons/logo.svg"
                    alt="logo"
                    width={250}
                    height={250}
                    className="mt-8 mb-3"
                />
                <p className="text-white text-[18px] italic mb-3">
                    Start earning Rally Coins today - every game brings you
                    closer to rewards.
                </p>
            </section>
            <section className="flex-1">
                <div className="flex gap-6 text-white  px-4">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-[20px] text-primary-orange">
                            For <span className="text-light-blue">Players</span>
                        </h1>
                        <p className="text-[16px] tracking-[-0.28px]">
                            We are squash and racket sports enthusiasts who want
                            to make every visit to the court more rewarding.
                            With Rally Up Go, you don&apos;t just play - you
                            collect Rally Coins, unlock rewards, and feel part
                            of a community that values your time and passion.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-[20px] text-primary-orange">
                            For <span className="text-light-blue">Clubs</span>
                        </h1>
                        <p className="text-[16px] tracking-[-0.28px]">
                            We help clubs build loyalty and boost engagement
                            with a simple, privacy-first loyalty app. No complex
                            integrations, no extra work for staff - just a QR
                            code at reception and a clear view of how players
                            return more often and stay longer.
                        </p>
                    </div>
                </div>
                <div className="flex-center flex-col gap-3 mt-6 mb-4 px-4">
                    <Link
                        href={ROUTES.SIGNIN}
                        className="w-full h-12 bg-primary-orange rounded-[16px] flex-center text-white font-bold"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={ROUTES.SIGNUP}
                        className="w-full h-12 bg-light-blue rounded-[16px] flex-center text-white font-bold"
                    >
                        Register
                    </Link>
                </div>
                <div className="flex flex-col gap-2 mb-4 px-4">
                    <h1 className="text-white font-bold text-[18px]">
                        Cities we operate in:
                    </h1>
                    <Badge variant="secondary" className="text-[15px]">
                        Amsterdam, NL
                    </Badge>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-white font-bold text-[18px] px-4">
                        Our partner clubs:
                    </h1>
                    <div className="flex overflow-x-auto">
                        {clubs.map((club) => (
                            <ImageCard
                                key={club.id}
                                imgUrl={club.imgUrl}
                                alt={club.name}
                                text={club.name}
                                active={club.id === 0}
                            />
                        ))}

                        <div className="rounded-[16px] mx-4 relative flex-center bg-[#242B581A] min-w-[130px]">
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-black/40 rounded-[16px]"
                            />

                            <p className="text-white font-extrabold text-[10px] max-w-[120px] mx-auto text-center z-10">
                                More Coming Soon...
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className=" px-4  mt-4">
                <div className="text-white border-t-[1px] py-3 flex justify-between items-center">
                    <div className="flex flex-col text-[14px] gap-1">
                        <p>Contact us at:</p>
                        <p className="font-[500] italic">info@rallyup.go</p>
                    </div>
                    <div className="flex flex-col text-[14px] gap-1">
                        <p>Get to know how we operate at:</p>
                        <Link
                            href="/files/Privacy_Terms_and_condidions_RallyUpGo.pdf"
                            download
                            className="font-[500] italic"
                        >
                            Privacy & Terms and Conditions
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
