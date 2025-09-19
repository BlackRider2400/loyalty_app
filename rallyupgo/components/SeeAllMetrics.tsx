"use client";
import React, { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BasicMetrics from "./BasicMetrics";
import MonthlyChart from "./MonthlyChart";

const selectItemClassname = "!text-black !font-semibold";
const months = [
    "January",
    "February",
    // "March",
    // "April",
    // "May",
    // "June",
    // "July",
    // "August",
    // "September",
    // "October",
    // "November",
    // "December",
] as const;

const SeeAllMetrics = () => {
    const [month, setMonth] = useState<string | "">("");
    const [year, setYear] = useState<string>("");

    const bothSelected = month !== "" && year !== "";

    // Example: react when both are chosen (fetch, etc.)
    useEffect(() => {
        if (!bothSelected) return;

        // Do your fetch here
        // fetch(`/api/metrics?start=${start.toISOString()}&end=${end.toISOString()}`)
        //   .then(res => res.json()).then(setData)
        console.log("Selected:", { month, year });
    }, [month, year, bothSelected]);
    return (
        <div className="flex flex-col gap-4">
            {!bothSelected && (
                <p className="italic text-white leading-0">
                    Select the month and year below to see complete data.
                </p>
            )}
            <div className="flex-center gap-4">
                <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="flex-1 !bg-white !text-black !font-bold">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((m) => (
                            <SelectItem
                                key={m}
                                value={m}
                                className={selectItemClassname}
                            >
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="flex-1 !bg-white !text-black !font-bold">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {["2025", "2024"].map((y) => (
                            <SelectItem
                                key={y}
                                value={y}
                                className={selectItemClassname}
                            >
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {bothSelected && (
                <div className="text-white">
                    <div className="flex flex-col gap-6">
                        <BasicMetrics />
                    </div>
                    <div className="flex flex-col mt-4">
                        <h1 className="font-bold text-[22px] text-white">
                            Number of Scans in {month} {year}
                        </h1>
                        <MonthlyChart month={month} year={Number(year)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeeAllMetrics;
