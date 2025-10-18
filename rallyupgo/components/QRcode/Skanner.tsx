"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

interface QrScannerProps {
    onScanResult?: (uuid: string) => void;
}

const QrScanner = ({ onScanResult }: QrScannerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [result, setResult] = useState("");

    useEffect(() => {
        const reader = new BrowserQRCodeReader();
        let controls: { stop: () => void } | undefined;

        (async () => {
            controls = await reader.decodeFromVideoDevice(
                undefined,
                videoRef.current!,
                (res) => {
                    if (res) {
                        const scannedText = res.getText();
                        setResult(scannedText);
                        onScanResult?.(scannedText);
                    }
                }
            );
        })();

        return () => controls?.stop();
    }, [onScanResult]);

    return (
        <div className="space-y-3">
            <video ref={videoRef} className="w-full rounded shadow" />
            <div className="text-sm text-gray-600">Wynik: {result || "—"}</div>
        </div>
    );
};

export default QrScanner;
