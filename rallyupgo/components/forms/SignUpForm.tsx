"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const FormSchema = z.object({
    username: z.string().min(1, { message: "Username is required." }),
    email: z.email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    acceptTerms: z.boolean().refine((v) => v, {
        message: "You must accept the terms and conditions.",
    }),
});

type FormValues = z.infer<typeof FormSchema>;

export function SignUpForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            acceptTerms: false,
        },
    });

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }),
            });

            const ct = res.headers.get("content-type") || "";
            const payload = ct.includes("application/json")
                ? await res.json()
                : await res.text();

            if (res.status === 201) {
                const msg =
                    typeof payload === "string"
                        ? payload
                        : payload?.message || "User registered successfully.";
                toast.success(msg);

                router.push("/check-email");
                return;
            }

            if (res.status === 409) {
                const msg =
                    typeof payload === "string"
                        ? payload
                        : payload?.error || "Email already in use.";
                form.setError("email", { message: msg });
                toast.error(msg);
                return;
            }

            const genericMsg =
                typeof payload === "string"
                    ? payload
                    : payload?.error || "Registration failed.";
            toast.error(genericMsg);
        } catch {
            toast.error("Network error during registration.");
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Username{" "}
                                    <span className="text-[#FF383C]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="your_username"
                                        className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Email{" "}
                                    <span className="text-[#FF383C]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="you@example.com"
                                        className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Password{" "}
                                    <span className="text-[#FF383C]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="••••••"
                                        className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="acceptTerms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) =>
                                            field.onChange(!!checked)
                                        }
                                    />
                                </FormControl>

                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal !text-white">
                                        I agree to the{" "}
                                        <Link
                                            href="/files/RallyUpGo_Terms_EN_NL.pdf"
                                            className="underline"
                                            download
                                        >
                                            Terms & Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href="/files/RallyUpGo_Privacy_EN_NL.pdf"
                                            className="underline"
                                            download
                                        >
                                            Privacy Policy
                                        </Link>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting || !form.watch("acceptTerms")}
                        aria-busy={isSubmitting}
                        className="w-full mt-2 rounded-[16px] bg-light-blue text-[16px] font-bold py-6 hover:bg-primary-orange disabled:opacity-60"
                    >
                        {isSubmitting ? "Signing up..." : "Sign Up"}
                    </Button>
                </form>
            </Form>

            <div className="mt-7 pl-2">
                <p className="text-white italic flex flex-col">
                    Already have an account?{" "}
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
}
