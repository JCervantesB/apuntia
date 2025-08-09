import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.clerk.com'],
  },
  webpack: (config, { isServer }) => {
    // Add resolver fallbacks for Node.js modules
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        path: false,
        os: false,
      },
    };
    
    return config;
  },
};

export default nextConfig;