"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    {
        year: 2024,
        months: [
            {
                month: "January",
                days: [
                    { day: "01", scans: 30 },
                    { day: "02", scans: 35 },
                    { day: "03", scans: 28 },
                    { day: "04", scans: 40 },
                    { day: "05", scans: 45 },
                    { day: "06", scans: 50 },
                    { day: "07", scans: 55 },
                    { day: "08", scans: 60 },
                    { day: "09", scans: 65 },
                    { day: "10", scans: 70 },
                    { day: "11", scans: 75 },
                    { day: "12", scans: 80 },
                    { day: "13", scans: 85 },
                    { day: "14", scans: 90 },
                    { day: "15", scans: 95 },
                    { day: "16", scans: 100 },
                    { day: "17", scans: 105 },
                    { day: "18", scans: 110 },
                    { day: "19", scans: 115 },
                    { day: "20", scans: 120 },
                    { day: "21", scans: 125 },
                    { day: "22", scans: 130 },
                    { day: "23", scans: 135 },
                    { day: "24", scans: 140 },
                    { day: "25", scans: 145 },
                    { day: "26", scans: 150 },
                    { day: "27", scans: 155 },
                    { day: "28", scans: 160 },
                    { day: "29", scans: 165 },
                    { day: "30", scans: 170 },
                    { day: "31", scans: 175 },
                ],
            },
            {
                month: "February",
                days: [
                    { day: "01", scans: 25 },
                    { day: "02", scans: 30 },
                    { day: "03", scans: 28 },
                    { day: "04", scans: 35 },
                    { day: "05", scans: 40 },
                    { day: "06", scans: 45 },
                    { day: "07", scans: 50 },
                    { day: "08", scans: 55 },
                    { day: "09", scans: 60 },
                    { day: "10", scans: 65 },
                    { day: "11", scans: 70 },
                    { day: "12", scans: 75 },
                    { day: "13", scans: 80 },
                    { day: "14", scans: 85 },
                    { day: "15", scans: 90 },
                    { day: "16", scans: 95 },
                    { day: "17", scans: 100 },
                    { day: "18", scans: 105 },
                    { day: "19", scans: 110 },
                    { day: "20", scans: 115 },
                    { day: "21", scans: 120 },
                    { day: "22", scans: 125 },
                    { day: "23", scans: 130 },
                    { day: "24", scans: 135 },
                    { day: "25", scans: 140 },
                    { day: "26", scans: 145 },
                    { day: "27", scans: 150 },
                    { day: "28", scans: 155 },
                    { day: "29", scans: 160 },
                ],
            },
        ],
    },
    {
        year: 2025,
        months: [
            {
                month: "January",
                days: [
                    { day: "01", scans: 25 },
                    { day: "02", scans: 30 },
                    { day: "03", scans: 28 },
                    { day: "04", scans: 35 },
                    { day: "05", scans: 40 },
                    { day: "06", scans: 45 },
                    { day: "07", scans: 50 },
                    { day: "08", scans: 55 },
                    { day: "09", scans: 60 },
                    { day: "10", scans: 65 },
                    { day: "11", scans: 70 },
                    { day: "12", scans: 75 },
                    { day: "13", scans: 80 },
                    { day: "14", scans: 85 },
                    { day: "15", scans: 90 },
                    { day: "16", scans: 95 },
                    { day: "17", scans: 100 },
                    { day: "18", scans: 105 },
                    { day: "19", scans: 110 },
                    { day: "20", scans: 115 },
                    { day: "21", scans: 120 },
                    { day: "22", scans: 125 },
                    { day: "23", scans: 130 },
                    { day: "24", scans: 135 },
                    { day: "25", scans: 140 },
                    { day: "26", scans: 145 },
                    { day: "27", scans: 150 },
                    { day: "28", scans: 155 },
                    { day: "29", scans: 160 },
                    { day: "30", scans: 165 },
                    { day: "31", scans: 170 },
                ],
            },
            {
                month: "February",
                days: [
                    { day: "01", scans: 30 },
                    { day: "02", scans: 35 },
                    { day: "03", scans: 28 },
                    { day: "04", scans: 40 },
                    { day: "05", scans: 45 },
                    { day: "06", scans: 50 },
                    { day: "07", scans: 55 },
                    { day: "08", scans: 60 },
                    { day: "09", scans: 65 },
                    { day: "10", scans: 70 },
                    { day: "11", scans: 75 },
                    { day: "12", scans: 80 },
                    { day: "13", scans: 85 },
                    { day: "14", scans: 90 },
                    { day: "15", scans: 95 },
                    { day: "16", scans: 100 },
                    { day: "17", scans: 105 },
                    { day: "18", scans: 110 },
                    { day: "19", scans: 115 },
                    { day: "20", scans: 120 },
                    { day: "21", scans: 125 },
                    { day: "22", scans: 130 },
                    { day: "23", scans: 135 },
                    { day: "24", scans: 140 },
                    { day: "25", scans: 145 },
                    { day: "26", scans: 150 },
                    { day: "27", scans: 155 },
                    { day: "28", scans: 160 },
                ],
            },
        ],
    },
];
const chartConfig = {
    scans: {
        label: "Scans",
        // works with shadcn/ui <ChartContainer/> CSS variables
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

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
];

const monthIndexFromName = (name: string) => {
    const cleaned = name.trim().toLowerCase();
    return months.findIndex((m) => m.toLowerCase() === cleaned);
};

const daysInMonth = (year: number, monthIndex: number) => {
    return new Date(year, monthIndex + 1, 0).getDate();
};

const getMonthData = (year: number, month: string) => {
    const y = chartData.find((y) => y.year === year);
    if (!y) return null;

    const exact = y.months.find(
        (m) => m.month.toLowerCase() === month.toLowerCase()
    );
    if (exact) return exact;
    const prefix = month.slice(0, 3).toLowerCase();
    return (
        y.months.find((m) => m.month.slice(0, 3).toLowerCase() === prefix) ||
        null
    );
};

const MonthlyChart = ({ month, year }: { month: string; year: number }) => {
    const mIndex = monthIndexFromName(month);
    const monthObj = getMonthData(year, month);

    const provided = new Map<string, number>(
        monthObj?.days.map((d) => [d.day, d.scans]) ?? []
    );

    const totalDays = mIndex >= 0 ? daysInMonth(year, mIndex) : 31;

    const data = Array.from({ length: totalDays }, (_, i) => {
        const day = String(i + 1).padStart(2, "0");
        return {
            day,
            scans: provided.get(day) ?? 0,
        };
    });
    return (
        <ChartContainer
            config={chartConfig}
            className="min-h-[200px] w-[full] mt-8"
        >
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    interval={1}
                />
                <YAxis domain={[0, "auto"]} width={32} allowDecimals={false} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="scans" fill="#ff4d2f" />
            </BarChart>
        </ChartContainer>
    );
};

export default MonthlyChart;
