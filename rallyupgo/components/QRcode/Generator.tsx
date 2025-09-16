"use client";

import { useEffect, useRef } from "react";
import {
    QRCodeWriter,
    BarcodeFormat,
    EncodeHintType,
    QRCodeDecoderErrorCorrectionLevel,
} from "@zxing/library";

export default function QrGenerator({
    text = "youtube.com/watch?v=UBtCejQ62fk",
    size = 330,
}: {
    text?: string;
    size?: number;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const writer = new QRCodeWriter();

        const hints = new Map<EncodeHintType, unknown>();
        hints.set(
            EncodeHintType.ERROR_CORRECTION,
            QRCodeDecoderErrorCorrectionLevel.M
        );
        hints.set(EncodeHintType.MARGIN, 1);

        const matrix = writer.encode(
            text,
            BarcodeFormat.QR_CODE,
            size,
            size,
            hints
        );

        const w = matrix.getWidth();
        const h = matrix.getHeight();

        const canvas = canvasRef.current!;
        const scale = Math.max(1, Math.floor(size / Math.max(w, h)));
        canvas.width = w * scale;
        canvas.height = h * scale;

        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000";

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (matrix.get(x, y))
                    ctx.fillRect(x * scale, y * scale, scale, scale);
            }
        }
    }, [text, size]);

    return <canvas ref={canvasRef} className="rounded" />;
}
