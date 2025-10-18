"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters."),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters."),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

const ResetPasswordPage = () => {
    const router = useRouter();
    const params = useSearchParams();

    const token = params.get("token");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tokenError, setTokenError] = useState<string | null>(null);

    useEffect(() => {
        if (!token)
            setTokenError("Missing or invalid token. Request a new link.");
        else setTokenError(null);
    }, [token]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { password: "", confirmPassword: "" },
        mode: "onSubmit",
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        if (!token) {
            toast.error("Missing token. Please use the link from your email.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch(
                `/api/auth/reset-password?token=${encodeURIComponent(token)}`,
                {
                    method: "POST",
                    headers: { "content-type": "text/plain" },

                    body: values.password.trim(),
                }
            );

            const payload = await res.json();

            if (res.ok) {
                toast.success(
                    payload?.message ?? "Password changed. You can now sign in."
                );
                router.replace("/sign-in");
            } else {
                const msg =
                    payload?.error ??
                    (res.status === 400
                        ? "Invalid or expired link. Please request a new one."
                        : "Reset failed. Try again.");
                toast.error(msg);
            }
        } catch (err) {
            toast.error("Network error", {
                description:
                    err instanceof Error
                        ? err.message
                        : "Unexpected error occurred.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    New password{" "}
                                    <span className="text-[#FF383C]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                        autoComplete="new-password"
                                        aria-invalid={
                                            !!form.formState.errors.password
                                        }
                                        minLength={6}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Repeat password{" "}
                                    <span className="text-[#FF383C]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                        autoComplete="new-password"
                                        aria-invalid={
                                            !!form.formState.errors
                                                .confirmPassword
                                        }
                                        minLength={6}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {tokenError && (
                        <p className="text-sm text-[#FF383C]">{tokenError}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full mt-2 rounded-[16px] bg-light-blue text-[16px] font-bold py-6 hover:bg-primary-orange disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={isSubmitting || !token}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Change password"}
                    </Button>

                    <Link
                        href="/forgot-password"
                        className="mt-3 px-2 text-[16px] font-semibold hover:text-primary-orange text-light-blue underline italic"
                    >
                        Request a new link
                    </Link>
                </form>
            </Form>

            <div className="mt-7 pl-2">
                <p className="text-white italic">
                    Remembered your password?{" "}
                    <Link
                        href="/sign-in"
                        className="text-light-blue italic underline"
                    >
                        Sign In.
                    </Link>
                </p>
            </div>
        </>
    );
};

export default ResetPasswordPage;
