"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export type Coupon = {
    id: string;
    location: string;
    title: string;
    description: string;
    imgUrl: string;
    priceCoins: number;
    code?: string;
    enabled: boolean;
};

const couponSchema = z.object({
    title: z.string().min(2, "Title is too short").max(60),
    description: z.string().min(5, "Description is too short").max(240),
    priceCoins: z.coerce.number().int().nonnegative(),
    enabled: z.boolean().default(true),
    file: z
        .custom<File>((v) => v instanceof File, {
            message: "Please choose an image",
        })
        .refine(
            (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
            {
                message: "JPG / PNG / WebP only",
            }
        )
        .refine((f) => f.size <= 10 * 1024 * 1024, { message: "Max 10 MB" }),
});

type CouponFormInput = z.input<typeof couponSchema>;
type CouponFormValues = z.output<typeof couponSchema>;

function CoverUploader({
    file,
    onFile,
    onClear,
}: {
    file?: File | null;
    onFile: (f: File) => void;
    onClear: () => void;
}) {
    const [preview, setPreview] = React.useState<string | undefined>(undefined);

    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const onDropAccepted = React.useCallback(
        (accepted: File[]) => {
            const f = accepted?.[0];
            if (!f) return;
            onFile(f);
        },
        [onFile]
    );

    const onDropRejected = React.useCallback(
        (fileRejections: import("react-dropzone").FileRejection[]) => {
            const msg =
                fileRejections?.[0]?.errors?.[0]?.message ??
                "Invalid file. Use JPG/PNG/WebP under 10 MB.";
            toast.error(msg);
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        onDropRejected,
        accept: { "image/*": [] },
        multiple: false,
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024,
    });

    return (
        <div className="flex flex-col gap-2">
            <div
                {...getRootProps()}
                className={`relative h-40 rounded-2xl border-2 border-dashed ${
                    isDragActive
                        ? "border-primary-orange bg-white/10"
                        : "border-white/30"
                } flex-center overflow-hidden cursor-pointer`}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <>
                        <Image
                            src={preview}
                            alt="Cover preview"
                            className="object-cover"
                            fill
                        />
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-black/20"
                        />
                        <Button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClear();
                            }}
                            className="absolute bottom-2 right-2 bg-primary-orange hover:bg-light-blue text-white rounded-full px-3 py-1.5 h-8"
                        >
                            Remove
                        </Button>
                    </>
                ) : (
                    <div className="text-center px-4">
                        <p className="text-white font-semibold">
                            Tap to choose or drag & drop
                        </p>
                        <p className="text-white/70 text-sm">
                            JPG / PNG / WebP • max 10 MB
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

const EditCouponPage = () => {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [initial, setInitial] = React.useState<Coupon | null>(null);
    useEffect(() => {
        setInitial({
            id: id as string,
            location: "Main club",
            title: "Abc -50%",
            description: "Half-price coffee at reception.",
            imgUrl: "/images/coffee.jpg",
            priceCoins: 150,
            code: "COF50-7KQ8",
            enabled: true,
        });
    }, [id]);

    const form = useForm<CouponFormInput, undefined, CouponFormValues>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            title: "",
            description: "",
            priceCoins: 0,
            enabled: true,
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (initial) {
            form.reset({
                title: initial.title,
                description: initial.description,
                priceCoins: initial.priceCoins,
                enabled: initial.enabled,
            });
        }
    }, [initial, form]);

    const [submitting, setSubmitting] = useState(false);

    const onSubmit: SubmitHandler<CouponFormValues> = async (values) => {
        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("title", values.title);
            fd.append("description", values.description);
            fd.append("priceCoins", String(values.priceCoins));
            fd.append("enabled", String(values.enabled));
            fd.append("file", values.file);

            toast.success("Coupon updated successfully!");
            router.push(ROUTES.CLUB_COUPONS || "/c/coupons");
        } catch (e) {
            console.error(e);
            alert("Failed to update coupon.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!initial) {
        return (
            <div className="min-h-screen flex flex-col bg-primary-blue text-white">
                <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                    <Link href={ROUTES.CLUB_COUPONS || "/c/coupons"}>
                        <Image
                            src="/icons/arrow.svg"
                            alt="Back"
                            width={24}
                            height={24}
                        />
                    </Link>
                    <h1 className="text-[20px] font-semibold text-white">
                        Edit Coupon
                    </h1>
                    <span className="w-6 h-6" />
                </section>
                <main className="flex-1 p-4">Loading…</main>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col bg-primary-blue">
            <section className="bg-primary-orange w-full pt-12 pb-5 flex-center justify-between px-3">
                <h1 className="text-[20px] font-semibold text-white mx-auto">
                    Edit Coupon
                </h1>
            </section>

            <main className="flex-1 overflow-y-auto p-4 pb-10">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 text-white"
                    >
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white text-[16px] font-bold">
                                        Cover image
                                    </FormLabel>
                                    <FormControl>
                                        <CoverUploader
                                            file={
                                                field.value as unknown as File | null
                                            }
                                            onFile={(f) => field.onChange(f)}
                                            onClear={() =>
                                                field.onChange(undefined)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white text-[16px] font-bold">
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Protein Bar FREE"
                                            className="!bg-white text-black rounded-2xl h-12 border-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white text-[16px] font-bold">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            placeholder="Short, clear benefit…"
                                            className="!bg-white text-black rounded-2xl border-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priceCoins"
                            render={({ field }) => {
                                const { onChange, onBlur, name, ref, value } =
                                    field;
                                return (
                                    <FormItem>
                                        <FormLabel className="text-white text-[16px] font-bold">
                                            Price (RallyCoins)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                min={0}
                                                className="!bg-white text-black rounded-2xl h-12 border-none"
                                                name={name}
                                                ref={ref}
                                                onBlur={onBlur}
                                                value={
                                                    value === undefined ||
                                                    value === null ||
                                                    value === ""
                                                        ? ""
                                                        : Number(
                                                              value as
                                                                  | number
                                                                  | string
                                                          )
                                                }
                                                onChange={(e) =>
                                                    onChange(
                                                        e.target.value === ""
                                                            ? ""
                                                            : Number(
                                                                  e.target.value
                                                              )
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <p className="text-white/70 text-sm">
                                            Shown as{" "}
                                            <span className="text-primary-orange font-semibold">
                                                Rally
                                            </span>
                                            <span className="text-light-blue font-semibold">
                                                Coins
                                            </span>{" "}
                                            on the card.
                                        </p>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="enabled"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-2xl bg-[#1F4F79] px-4 py-3">
                                    <FormLabel className="text-white text-[16px] font-bold m-0">
                                        Enabled
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <Link href={ROUTES.CLUB_COUPONS || "/c/coupons"}>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="w-full h-12 rounded-2xl bg-white text-black hover:bg-white/90"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                className="w-full h-12 rounded-2xl bg-primary-orange hover:bg-light-blue text-white font-semibold"
                                disabled={submitting}
                            >
                                {submitting ? "Saving…" : "Save changes"}
                            </Button>
                        </div>
                        <div className="w-full">
                            <AlertDialog>
                                <AlertDialogTrigger className="w-full flex-center justify-center h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold">
                                    Delete
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete this coupon?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone.
                                            <br />
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="flex-center gap-2 flex-row">
                                        <AlertDialogCancel className="flex-1">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </form>
                </Form>
            </main>
        </div>
    );
};
export default EditCouponPage;
