import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/yetweets/vault/**",
      },
      {
        protocol: "https",
        hostname: "lp7x2l6b4majf9v9.public.blob.vercel-storage.com",
        pathname: "/**",
      }
    ],
  }
};

export default nextConfig;