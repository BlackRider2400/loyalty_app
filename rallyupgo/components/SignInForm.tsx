"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { z } from "zod";

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
import Link from "next/link";

const FormSchema = z.object({
    password: z.string(),
    email: z.string().email({ message: "Invalid email address." }),
});

export function SignInForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            email: "",
        },
        mode: "onSubmit",
    });

    // Wywołanie lokalnego API: /app/api/auth/login/route.ts (proxy do backendu)
    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include", // odbiór/set Cookie (HttpOnly) z odpowiedzi
                body: JSON.stringify(values),
            });

            // Spróbuj odczytać JSON (jeśli jest)
            const contentType = res.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
                ? await res.json()
                : null;

            if (!res.ok) {
                // Mapowanie 401 z backendu
                const msg =
                    data?.error ||
                    (res.status === 401
                        ? "Unauthorized - Invalid credentials"
                        : "Login failed. Try again.");
                // pokaż błąd przy polach + toast
                form.setError("email", { message: undefined });
                form.setError("password", { message: undefined });
                if (res.status === 401) {
                    form.setError("email", {
                        message: "Invalid email or password.",
                    });
                    form.setError("password", {
                        message: "Invalid email or password.",
                    });
                }
                toast.error(msg);
                return;
            }

            // Sukces — API route ustawi ciasteczka HttpOnly: access_token / refresh_token
            if (data?.authenticated) {
                toast.success("Welcome back!", {
                    description: data?.email
                        ? `Signed in as ${data.email}`
                        : undefined,
                });
            } else {
                toast.success("Signed in.");
            }

            // (Opcjonalnie) przekierowanie po zalogowaniu:
            router.replace("/u");
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Unexpected error during login.";
            toast.error("Network error", { description: message });
        }
    }

    const isSubmitting = form.formState.isSubmitting;

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Email
                                    <span className="text-[#FF383C]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="you@example.com"
                                        className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                        autoComplete="email"
                                        aria-invalid={
                                            !!form.formState.errors.email
                                        }
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
                                    Password
                                    <span className="text-[#FF383C]">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="••••••"
                                        type="password"
                                        className="w-full rounded-[16px] h-14 !bg-white text-black placeholder:text-neutral-500 border-0 outline-none ring-0 focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                                        autoComplete="current-password"
                                        aria-invalid={
                                            !!form.formState.errors.password
                                        }
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full mt-2 rounded-[16px] bg-light-blue text-[16px] font-bold py-6 hover:bg-primary-orange disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Form>

            <div className="mt-7 pl-2">
                <p className="text-white italic flex flex-col">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-light-blue italic underline"
                    >
                        Sign Up.
                    </Link>
                </p>
            </div>
        </>
    );
}
