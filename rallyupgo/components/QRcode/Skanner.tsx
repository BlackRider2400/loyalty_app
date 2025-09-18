"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";

export default function QrScanner() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [result, setResult] = useState("");

    useEffect(() => {
        const reader = new BrowserQRCodeReader();
        let controls: { stop: () => void } | undefined;

        (async () => {
            controls = await reader.decodeFromVideoDevice(
                undefined, // domyślna kamera
                videoRef.current!,
                (res) => {
                    if (res) setResult(res.getText());
                }
            );
        })();

        // Używamy controls – ESLint happy
        return () => controls?.stop();
    }, []);

    return (
        <div className="space-y-3">
            <video ref={videoRef} className="w-full rounded shadow" />
            <div className="text-sm text-gray-600">Wynik: {result || "—"}</div>
        </div>
    );
}
