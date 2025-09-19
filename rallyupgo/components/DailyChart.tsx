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
        hour: "00",
        Monday: 2,
        Tuesday: 2,
        Wednesday: 2,
        Thursday: 2,
        Friday: 3,
        Saturday: 4,
        Sunday: 3,
    },
    {
        hour: "01",
        Monday: 1,
        Tuesday: 1,
        Wednesday: 1,
        Thursday: 1,
        Friday: 2,
        Saturday: 3,
        Sunday: 2,
    },
    {
        hour: "02",
        Monday: 1,
        Tuesday: 1,
        Wednesday: 1,
        Thursday: 1,
        Friday: 2,
        Saturday: 2,
        Sunday: 1,
    },
    {
        hour: "03",
        Monday: 1,
        Tuesday: 1,
        Wednesday: 1,
        Thursday: 1,
        Friday: 2,
        Saturday: 2,
        Sunday: 1,
    },
    {
        hour: "04",
        Monday: 2,
        Tuesday: 2,
        Wednesday: 2,
        Thursday: 2,
        Friday: 3,
        Saturday: 2,
        Sunday: 1,
    },
    {
        hour: "05",
        Monday: 3,
        Tuesday: 3,
        Wednesday: 3,
        Thursday: 3,
        Friday: 4,
        Saturday: 3,
        Sunday: 2,
    },
    {
        hour: "06",
        Monday: 5,
        Tuesday: 6,
        Wednesday: 5,
        Thursday: 6,
        Friday: 7,
        Saturday: 5,
        Sunday: 4,
    },
    {
        hour: "07",
        Monday: 12,
        Tuesday: 14,
        Wednesday: 11,
        Thursday: 15,
        Friday: 16,
        Saturday: 10,
        Sunday: 8,
    },
    {
        hour: "08",
        Monday: 20,
        Tuesday: 22,
        Wednesday: 19,
        Thursday: 24,
        Friday: 25,
        Saturday: 18,
        Sunday: 14,
    },
    {
        hour: "09",
        Monday: 28,
        Tuesday: 30,
        Wednesday: 27,
        Thursday: 32,
        Friday: 34,
        Saturday: 26,
        Sunday: 20,
    },
    {
        hour: "10",
        Monday: 35,
        Tuesday: 38,
        Wednesday: 34,
        Thursday: 40,
        Friday: 42,
        Saturday: 33,
        Sunday: 27,
    },
    {
        hour: "11",
        Monday: 42,
        Tuesday: 44,
        Wednesday: 41,
        Thursday: 47,
        Friday: 49,
        Saturday: 39,
        Sunday: 33,
    },
    {
        hour: "12",
        Monday: 48,
        Tuesday: 50,
        Wednesday: 47,
        Thursday: 53,
        Friday: 55,
        Saturday: 45,
        Sunday: 38,
    },
    {
        hour: "13",
        Monday: 52,
        Tuesday: 55,
        Wednesday: 50,
        Thursday: 57,
        Friday: 60,
        Saturday: 50,
        Sunday: 42,
    },
    {
        hour: "14",
        Monday: 49,
        Tuesday: 51,
        Wednesday: 47,
        Thursday: 54,
        Friday: 58,
        Saturday: 52,
        Sunday: 44,
    },
    {
        hour: "15",
        Monday: 45,
        Tuesday: 46,
        Wednesday: 43,
        Thursday: 49,
        Friday: 52,
        Saturday: 50,
        Sunday: 43,
    },
    {
        hour: "16",
        Monday: 43,
        Tuesday: 44,
        Wednesday: 41,
        Thursday: 47,
        Friday: 50,
        Saturday: 48,
        Sunday: 41,
    },
    {
        hour: "17",
        Monday: 40,
        Tuesday: 41,
        Wednesday: 38,
        Thursday: 44,
        Friday: 47,
        Saturday: 50,
        Sunday: 40,
    },
    {
        hour: "18",
        Monday: 38,
        Tuesday: 39,
        Wednesday: 35,
        Thursday: 40,
        Friday: 45,
        Saturday: 52,
        Sunday: 42,
    },
    {
        hour: "19",
        Monday: 30,
        Tuesday: 31,
        Wednesday: 28,
        Thursday: 33,
        Friday: 40,
        Saturday: 48,
        Sunday: 38,
    },
    {
        hour: "20",
        Monday: 22,
        Tuesday: 23,
        Wednesday: 21,
        Thursday: 24,
        Friday: 30,
        Saturday: 40,
        Sunday: 30,
    },
    {
        hour: "21",
        Monday: 15,
        Tuesday: 16,
        Wednesday: 14,
        Thursday: 17,
        Friday: 22,
        Saturday: 30,
        Sunday: 22,
    },
    {
        hour: "22",
        Monday: 9,
        Tuesday: 10,
        Wednesday: 8,
        Thursday: 11,
        Friday: 16,
        Saturday: 22,
        Sunday: 15,
    },
    {
        hour: "23",
        Monday: 5,
        Tuesday: 6,
        Wednesday: 5,
        Thursday: 7,
        Friday: 12,
        Saturday: 16,
        Sunday: 10,
    },
];

const chartConfig = {
    hour: {
        label: "Hour",
        color: "#256111",
    },
} satisfies ChartConfig;

const DailyChart = ({ day }: { day: string }) => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-[full]">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="hour"
                    tickLine={true}
                    tickMargin={10}
                    interval={1}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis domain={[0, "auto"]} width={20} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey={day} fill="#ff4d2f" />
            </BarChart>
        </ChartContainer>
    );
};

export default DailyChart;
