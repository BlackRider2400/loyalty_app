"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export type ClubCoupon = {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    priceCoins: number;
    active: boolean;
};

export default function ClubCouponForm({
    initial,
    onSubmit,
}: {
    initial?: Partial<ClubCoupon>;
    onSubmit: (data: Omit<ClubCoupon, "id">) => void;
}) {
    const [form, setForm] = useState<Omit<ClubCoupon, "id">>({
        title: initial?.title ?? "",
        description: initial?.description ?? "",
        imgUrl: initial?.imgUrl ?? "/images/largeImage.png",
        priceCoins: initial?.priceCoins ?? 100,
        active: initial?.active ?? true,
    });

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-white">Title</Label>
                <Input
                    value={form.title}
                    onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                    }
                    className="rounded-[16px] h-12"
                    placeholder="Coffee -50%"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-white">Description</Label>
                <Textarea
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                    className="rounded-[16px] min-h-[96px]"
                    placeholder="Short description visible to members"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-white">Image URL</Label>
                <Input
                    value={form.imgUrl}
                    onChange={(e) =>
                        setForm({ ...form, imgUrl: e.target.value })
                    }
                    className="rounded-[16px] h-12"
                    placeholder="/images/largeImage.png"
                />
                <p className="text-white/70 text-xs">
                    (Upload coming later — paste a URL for now)
                </p>
            </div>

            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Label className="text-white">Price (RallyCoins)</Label>
                    <Input
                        type="number"
                        value={form.priceCoins}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                priceCoins: Number(e.target.value) || 0,
                            })
                        }
                        className="rounded-[16px] h-12 w-40"
                    />
                </div>

                <div className="flex items-center gap-3 mt-7">
                    <Label className="text-white">Active</Label>
                    <Switch
                        checked={form.active}
                        onCheckedChange={(v) => setForm({ ...form, active: v })}
                    />
                </div>
            </div>

            <button
                className="w-full bg-light-blue hover:bg-primary-orange text-white font-semibold rounded-2xl h-12"
                onClick={() => onSubmit(form)}
            >
                Save
            </button>
        </div>
    );
}
