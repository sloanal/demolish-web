import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'demolish-web';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure we use the correct base path for GitHub Pages
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
  
  devIndicators: {
    // @ts-ignore - The property exists in Next 15+ but types might be lagging or strict
    appIsrStatus: false,
    buildActivity: false,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
};

export default nextConfig;
