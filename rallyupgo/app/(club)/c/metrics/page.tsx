import React from "react";

import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import ClubFooter from "@/components/ClubFooter";
import BasicMetrics from "@/components/BasicMetrics";

import DailyMetrics from "@/components/DailyMetrics";

const scansByHourChartData = {
    labels: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
    ],
    datasets: [
        {
            label: "Monday",
            data: [
                2, 1, 1, 1, 2, 3, 5, 12, 20, 28, 35, 42, 48, 52, 49, 45, 43, 40,
                38, 30, 22, 15, 9, 5,
            ],
        },
        {
            label: "Tuesday",
            data: [
                2, 1, 1, 1, 2, 3, 6, 14, 22, 30, 38, 44, 50, 55, 51, 46, 44, 41,
                39, 31, 23, 16, 10, 6,
            ],
        },
        {
            label: "Wednesday",
            data: [
                2, 1, 1, 1, 2, 3, 5, 11, 19, 27, 34, 41, 47, 50, 47, 43, 41, 38,
                35, 28, 21, 14, 8, 5,
            ],
        },
        {
            label: "Thursday",
            data: [
                2, 1, 1, 1, 2, 3, 6, 15, 24, 32, 40, 47, 53, 57, 54, 49, 47, 44,
                40, 33, 24, 17, 11, 7,
            ],
        },
        {
            label: "Friday",
            data: [
                3, 2, 2, 2, 3, 4, 7, 16, 25, 34, 42, 49, 55, 60, 58, 52, 50, 47,
                45, 40, 30, 22, 16, 12,
            ],
        },
        {
            label: "Saturday",
            data: [
                4, 3, 2, 2, 2, 3, 5, 10, 18, 26, 33, 39, 45, 50, 52, 50, 48, 50,
                52, 48, 40, 30, 22, 16,
            ],
        },
        {
            label: "Sunday",
            data: [
                3, 2, 1, 1, 1, 2, 4, 8, 14, 20, 27, 33, 38, 42, 44, 43, 41, 40,
                42, 38, 30, 22, 15, 10,
            ],
        },
    ],
};

const Metrics = () => {
    return (
        <div className="min-h-screen flex flex-col bg-primary-blue">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <Link href={ROUTES.CLUB_HOME}>
                    <Image
                        src="/icons/arrow.svg"
                        alt="Arrow"
                        width={24}
                        height={24}
                    />
                </Link>
                <h1 className="text-[20px] font-semibold text-white">
                    Your Metrics
                </h1>
                <span className="w-6 h-6" />
            </section>

            <main className="flex-1 overflow-y-auto p-4 pb-28">
                <Tabs defaultValue="This week" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 rounded-2xl bg-[#1F4F79] h-12 p-1">
                        <TabsTrigger
                            value="This week"
                            className="text-[16px] font-bold rounded-[12px] border-none data-[state=active]:!bg-primary-blue data-[state=active]:!text-white data-[state=inactive]:!text-white/60"
                        >
                            This week
                        </TabsTrigger>
                        <TabsTrigger
                            value="See all"
                            className="text-[16px] font-bold rounded-[12px] border-none data-[state=active]:!bg-primary-blue data-[state=active]:!text-white data-[state=inactive]:!text-white/60"
                        >
                            See all
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="This week" className="mt-2">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-6">
                                <h1 className="font-bold text-[22px] text-white">
                                    This week&apos;s data
                                </h1>
                                <BasicMetrics />
                            </div>
                            <div className="flex flex-col gap-6 ">
                                <DailyMetrics />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="See all" className="mt-5">
                        <div className="flex flex-col gap-6">xd</div>
                    </TabsContent>
                </Tabs>
            </main>

            <div className="fixed bottom-0 left-0 z-40">
                <ClubFooter />
            </div>
        </div>
    );
};

export default Metrics;
