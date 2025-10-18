"use client";

import { useState } from "react";
import QrScanner from "@/components/QRcode/Skanner";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ScannerClient = () => {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [scannedUuid, setScannedUuid] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleScanResult = (uuid: string) => {
        setScannedUuid(uuid);
    };

    const handleConfirm = () => {
        if (!scannedUuid) {
            toast.error("Please scan a QR code first");
            return;
        }
        setIsDialogOpen(true);
    };

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount("");
    };

    const handleCustomAmountChange = (value: string) => {
        const numValue = parseInt(value);
        if (value === "" || (!isNaN(numValue) && numValue > 0)) {
            setCustomAmount(value);
            setSelectedAmount(value === "" ? null : numValue);
        }
    };

    const handleAddCoins = async () => {
        if (!selectedAmount || !scannedUuid) {
            toast.error("Please select an amount");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/shop/add-credits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uuid: scannedUuid,
                    credits: selectedAmount,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add credits");
            }

            toast.success(`${selectedAmount} RallyCoins awarded successfully!`);
            setIsDialogOpen(false);
            setSelectedAmount(null);
            setCustomAmount("");
            setScannedUuid("");
        } catch (e) {
            const error = e as Error;
            toast.error(error.message || "Failed to add credits");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-primary-orange bg-white p-2">
                    <QrScanner onScanResult={handleScanResult} />
                </div>

                <div className="bg-white rounded-xl p-4 border border-neutral-200">
                    {scannedUuid && (
                        <p className="text-xs text-neutral-500 mb-2 font-mono truncate">
                            UUID: {scannedUuid}
                        </p>
                    )}
                    <p className="text-sm text-neutral-600 mb-3">
                        After scan, tap &quot;Confirm&quot; to award RallyCoins.
                    </p>
                    <Button
                        className="w-full rounded-[14px] bg-light-blue hover:bg-primary-orange"
                        onClick={handleConfirm}
                        disabled={!scannedUuid}
                    >
                        Confirm
                    </Button>
                </div>
            </div>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            How many coins are you awarding?
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="space-y-3">
                        <div className="grid grid-rows-3 gap-2">
                            <Button
                                variant={
                                    selectedAmount === 200
                                        ? "default"
                                        : "outline"
                                }
                                className="rounded-[14px] flex"
                                onClick={() => handleAmountSelect(200)}
                                disabled={isSubmitting}
                            >
                                <div>
                                    200{" "}
                                    <span className="text-primary-orange">
                                        Rally
                                    </span>
                                    <span className="text-light-blue">
                                        Coins
                                    </span>
                                </div>
                            </Button>
                            <Button
                                variant={
                                    selectedAmount === 100
                                        ? "default"
                                        : "outline"
                                }
                                className="rounded-[14px]"
                                onClick={() => handleAmountSelect(100)}
                                disabled={isSubmitting}
                            >
                                <div>
                                    100{" "}
                                    <span className="text-primary-orange">
                                        Rally
                                    </span>
                                    <span className="text-light-blue">
                                        Coins
                                    </span>
                                </div>
                            </Button>
                            <Button
                                variant={
                                    selectedAmount === 50
                                        ? "default"
                                        : "outline"
                                }
                                className="rounded-[14px]"
                                onClick={() => handleAmountSelect(50)}
                                disabled={isSubmitting}
                            >
                                <div>
                                    50{" "}
                                    <span className="text-primary-orange">
                                        Rally
                                    </span>
                                    <span className="text-light-blue">
                                        Coins
                                    </span>
                                </div>
                            </Button>
                        </div>

                        <div>
                            <label className="text-sm text-neutral-600 mb-1 block">
                                Custom Amount
                            </label>
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                value={customAmount}
                                onChange={(e) =>
                                    handleCustomAmountChange(e.target.value)
                                }
                                className="rounded-[14px]"
                                min="1"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <AlertDialogFooter className="flex-row gap-2">
                        <AlertDialogCancel
                            className="flex-1 rounded-[14px]"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <Button
                            className="flex-1 rounded-[14px] bg-light-blue hover:bg-primary-orange"
                            onClick={handleAddCoins}
                            disabled={!selectedAmount || isSubmitting}
                        >
                            {isSubmitting ? "Adding..." : "Add RallyCoins"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ScannerClient;
