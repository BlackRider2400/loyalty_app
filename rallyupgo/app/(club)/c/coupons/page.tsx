"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { ROUTES } from "@/constants/routes";
import ClubFooter from "@/components/ClubFooter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger,
} from "@/components/ui/sheet";
import ClubCouponForm, { ClubCoupon } from "@/components/ClubCouponForm";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const seed: ClubCoupon[] = [
    {
        id: "c1",
        title: "Coffee -50%",
        description: "Half-price coffee at reception.",
        imgUrl: "/images/largeImage.png",
        priceCoins: 150,
        active: true,
    },
    {
        id: "c2",
        title: "Squash Court -20%",
        description: "20% off next court rental.",
        imgUrl: "/images/largeImage.png",
        priceCoins: 400,
        active: true,
    },
    {
        id: "c3",
        title: "Protein Bar FREE",
        description: "Grab one free protein bar.",
        imgUrl: "/images/largeImage.png",
        priceCoins: 250,
        active: false,
    },
];

function Card({
    c,
    onEdit,
    onDelete,
    onToggle,
}: {
    c: ClubCoupon;
    onEdit: () => void;
    onDelete: () => void;
    onToggle: () => void;
}) {
    return (
        <div className="rounded-2xl bg-white overflow-hidden shadow-sm border border-neutral-200">
            <div className="relative w-full h-36">
                <Image
                    src={c.imgUrl}
                    alt={c.title}
                    fill
                    className="object-cover"
                />
                {!c.active && (
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Inactive
                    </span>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-primary-blue text-[16px] font-semibold leading-tight">
                    {c.title}
                </h3>
                <p className="text-[13px] text-neutral-600 mt-1 line-clamp-2">
                    {c.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icons/coins.svg"
                            alt="coins"
                            width={20}
                            height={20}
                            className="rotate-180"
                        />
                        <span className="text-primary-blue font-bold text-sm">
                            {c.priceCoins}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="rounded-[14px] h-9"
                            onClick={onToggle}
                        >
                            {c.active ? "Disable" : "Enable"}
                        </Button>
                        <Button
                            className="rounded-[14px] bg-light-blue hover:bg-primary-orange h-9"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="rounded-[14px] h-9"
                                >
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Delete “{c.title}”?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This only removes it from your offer.
                                        Members’ already claimed coupons are not
                                        affected.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-center gap-2 flex-row">
                                    <AlertDialogCancel className="flex-1">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="flex-1 bg-primary-blue hover:bg-primary-orange"
                                        onClick={onDelete}
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ClubCouponsManager() {
    const [coupons, setCoupons] = useState<ClubCoupon[]>(seed);
    const [editing, setEditing] = useState<ClubCoupon | null>(null);
    const [search, setSearch] = useState("");

    const filtered = useMemo(
        () =>
            coupons.filter((c) =>
                [c.title, c.description]
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ),
        [coupons, search]
    );

    return (
        <div className="min-h-screen flex flex-col bg-primary-blue">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <Link href={ROUTES.CLUB_HOME}>
                    <Image
                        src="/icons/arrow.svg"
                        alt="back"
                        width={24}
                        height={24}
                    />
                </Link>
                <h1 className="text-[20px] font-semibold text-white">
                    Coupons (Club)
                </h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="rounded-[14px] bg-white text-primary-blue h-8">
                            + New
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="bg-primary-blue border-t border-primary-orange h-[90vh] overflow-y-auto"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-white text-[28px]">
                                Create coupon
                            </SheetTitle>
                            <SheetDescription className="text-white/80">
                                Define how members can spend RallyCoins at your
                                club.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                            <ClubCouponForm
                                onSubmit={(data) => {
                                    const id = Math.random()
                                        .toString(36)
                                        .slice(2, 10);
                                    setCoupons((prev) => [
                                        { id, ...data },
                                        ...prev,
                                    ]);
                                    toast.success("Coupon created");
                                }}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </section>

            <main className="flex-1 overflow-y-auto p-4 pb-28">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 rounded-xl bg-[#1F4F79] p-0">
                        <TabsTrigger
                            value="all"
                            className="rounded-lg data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=inactive]:text-white/95"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="active"
                            className="rounded-lg data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=inactive]:text-white/95"
                        >
                            Active
                        </TabsTrigger>
                        <TabsTrigger
                            value="inactive"
                            className="rounded-lg data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=inactive]:text-white/95"
                        >
                            Inactive
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-4">
                        <Input
                            placeholder="Search coupons..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-[14px] h-11 !bg-white"
                        />
                    </div>

                    {(["all", "active", "inactive"] as const).map((tab) => {
                        const data =
                            tab === "all"
                                ? filtered
                                : tab === "active"
                                ? filtered.filter((c) => c.active)
                                : filtered.filter((c) => !c.active);
                        return (
                            <TabsContent key={tab} value={tab} className="mt-5">
                                {data.length === 0 ? (
                                    <p className="text-white/80 text-sm">
                                        No coupons found.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {data.map((c) => (
                                            <Card
                                                key={c.id}
                                                c={c}
                                                onToggle={() => {
                                                    setCoupons((prev) =>
                                                        prev.map((x) =>
                                                            x.id === c.id
                                                                ? {
                                                                      ...x,
                                                                      active: !x.active,
                                                                  }
                                                                : x
                                                        )
                                                    );
                                                }}
                                                onEdit={() => setEditing(c)}
                                                onDelete={() => {
                                                    setCoupons((prev) =>
                                                        prev.filter(
                                                            (x) => x.id !== c.id
                                                        )
                                                    );
                                                    toast.success(
                                                        "Coupon deleted"
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        );
                    })}
                </Tabs>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-40">
                <ClubFooter />
            </div>

            {/* Edit Drawer */}
            <Sheet
                open={!!editing}
                onOpenChange={(o) => !o && setEditing(null)}
            >
                <SheetContent
                    side="bottom"
                    className="bg-primary-blue border-t border-primary-orange h-[90vh] overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle className="text-white text-[28px]">
                            Edit coupon
                        </SheetTitle>
                        <SheetDescription className="text-white/80">
                            Update details and availability.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                        {editing && (
                            <ClubCouponForm
                                initial={editing}
                                onSubmit={(data) => {
                                    setCoupons((prev) =>
                                        prev.map((x) =>
                                            x.id === editing.id
                                                ? { ...x, ...data }
                                                : x
                                        )
                                    );
                                    toast.success("Changes saved");
                                    setEditing(null);
                                }}
                            />
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
