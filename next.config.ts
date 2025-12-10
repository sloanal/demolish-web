import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    // @ts-ignore - The property exists in Next 15+ but types might be lagging or strict
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
