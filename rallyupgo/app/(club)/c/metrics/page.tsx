import React from "react";

import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import ClubFooter from "@/components/ClubFooter";
import BasicMetrics from "@/components/BasicMetrics";

import DailyMetrics from "@/components/DailyMetrics";
import SeeAllMetrics from "@/components/SeeAllMetrics";

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
                        <div className="flex flex-col gap-6">
                            <SeeAllMetrics />
                        </div>
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
