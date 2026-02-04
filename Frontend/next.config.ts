import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.infrastructureLogging = { 
      level: 'error' 
    };
    return config;
  },
};

export default nextConfig;