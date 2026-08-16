import type { NextConfig } from "next";
import os from "node:os";

/** LAN IPs so a phone can hit http://192.168.x.x:3000 without blocked RSC/HMR. */
function lanDevOrigins() {
  const origins = new Set<string>([
    "localhost",
    "127.0.0.1",
    "192.168.0.103",
    "192.168.0.104",
  ]);

  const extra = process.env.ALLOWED_DEV_ORIGINS;
  if (extra) {
    for (const part of extra.split(",")) {
      const host = part.trim().replace(/^https?:\/\//, "").split(":")[0];
      if (host) origins.add(host);
    }
  }

  for (const addrs of Object.values(os.networkInterfaces())) {
    for (const addr of addrs || []) {
      const family = String(addr.family);
      if ((family === "IPv4" || family === "4") && !addr.internal) {
        origins.add(addr.address);
      }
    }
  }

  return [...origins];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: lanDevOrigins(),
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
