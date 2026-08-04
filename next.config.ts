import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN access (e.g. phone at http://192.168.0.103:3000) in development
  allowedDevOrigins: ["192.168.0.103"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
