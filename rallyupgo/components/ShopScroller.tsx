"use client";

import React from "react";
import ImageCard from "@/components/ImageCard";
import { ShopUserDTO } from "@/lib/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

type Props = {
    shops: ShopUserDTO[];
    currentShopId?: number;
};

const ShopScroller: React.FC<Props> = ({ shops, currentShopId }) => {
    const router = useRouter();
    const [pendingShop, setPendingShop] = React.useState<ShopUserDTO | null>(
        null
    );
    const [submitting, setSubmitting] = React.useState(false);
    const open = !!pendingShop;

    const onCardClick = (shop: ShopUserDTO) => {
        if (shop.id === currentShopId) return;
        setPendingShop(shop);
    };

    const confirmChange = async () => {
        if (!pendingShop) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/client/select-shop", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(pendingShop.id),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || res.statusText);
            }

            router.refresh();
        } catch (err) {
            console.error("Failed to change active club:", err);
        } finally {
            setSubmitting(false);
            setPendingShop(null);
        }
    };

    return (
        <>
            <div className="flex overflow-x-auto">
                {shops.map((shop) => (
                    <ImageCard
                        key={shop.id}
                        imgUrl="/images/clubImage.jpg"
                        alt={shop.name}
                        text={shop.name}
                        active={shop.id === currentShopId}
                        disabled={shop.id === currentShopId}
                        onClick={() => onCardClick(shop)}
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

            <AlertDialog
                open={open}
                onOpenChange={(o) => !o && setPendingShop(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Change active club?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change your active club to:{" "}
                            <span className="font-semibold">
                                {pendingShop?.name}
                            </span>
                            ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={submitting}>
                            No
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmChange}
                            disabled={submitting}
                        >
                            {submitting ? "Changing..." : "Yes, change"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ShopScroller;
