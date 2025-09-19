import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DailyChart from "./DailyChart";

const DailyMetrics = () => {
    const TabTriggerClassname =
        " text-[16px] font-bold rounded-[12px] border-none data-[state=active]:!bg-primary-blue data-[state=active]:!text-white data-[state=inactive]:!text-white/60";

    const TabContentClassname = "mt-2 text-white";
    return (
        <div className="w-full">
            <Tabs defaultValue="Mon" className="w-full">
                <TabsList className="w-full grid grid-cols-7 rounded-2xl bg-[#1F4F79] h-11 p-1">
                    <TabsTrigger value="Mon" className={TabTriggerClassname}>
                        Mon
                    </TabsTrigger>
                    <TabsTrigger value="Tue" className={TabTriggerClassname}>
                        Tue
                    </TabsTrigger>
                    <TabsTrigger value="Wed" className={TabTriggerClassname}>
                        Wed
                    </TabsTrigger>
                    <TabsTrigger value="Thu" className={TabTriggerClassname}>
                        Thu
                    </TabsTrigger>
                    <TabsTrigger value="Fri" className={TabTriggerClassname}>
                        Fri
                    </TabsTrigger>
                    <TabsTrigger value="Sat" className={TabTriggerClassname}>
                        Sat
                    </TabsTrigger>
                    <TabsTrigger value="Sun" className={TabTriggerClassname}>
                        Sun
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="Mon" className={TabContentClassname}>
                    <DailyChart day="Monday" />
                </TabsContent>
                <TabsContent value="Tue" className={TabContentClassname}>
                    <DailyChart day="Tuesday" />
                </TabsContent>
                <TabsContent value="Wed" className={TabContentClassname}>
                    <DailyChart day="Wednesday" />
                </TabsContent>
                <TabsContent value="Thu" className={TabContentClassname}>
                    <DailyChart day="Thursday" />
                </TabsContent>
                <TabsContent value="Fri" className={TabContentClassname}>
                    <DailyChart day="Friday" />
                </TabsContent>
                <TabsContent value="Sat" className={TabContentClassname}>
                    <DailyChart day="Saturday" />
                </TabsContent>
                <TabsContent value="Sun" className={TabContentClassname}>
                    <DailyChart day="Sunday" />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DailyMetrics;
