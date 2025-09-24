import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mylovelyserver.fun",
            },
        ],
    },
};

export default nextConfig;
