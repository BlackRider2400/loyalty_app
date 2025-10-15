"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Tile from "./Tile";

const Logout = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Logout failed");
            toast.success("Logged out");
        } catch (e) {
            toast.info("Session cleared");
        } finally {
            router.replace("/");
            router.refresh();
            setIsLoggingOut(false);
        }
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger className="w-full cursor-pointer">
                    <Tile
                        alt="logout"
                        imgUrl="/icons/logout.svg"
                        text="Logout"
                    />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to logout?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-center gap-2 flex-row">
                        <AlertDialogCancel className="flex-1">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="flex-1 bg-primary-blue hover:bg-primary-orange disabled:opacity-50"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? "Logging out..." : "Continue"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Logout;
