"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
    email: z.email({ message: "Invalid email address." }),
});

export function SignInForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
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
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full mt-2 rounded-[16px] bg-light-blue text-[16px] font-bold py-6 hover:bg-primary-orange"
                    >
                        Sign In
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
