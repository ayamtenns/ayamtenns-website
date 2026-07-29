import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only honours `quality` values listed here. The /box photos are
    // 4K+ originals (20–26 MB) served to phones on cellular, so we allow
    // lower qualities than the 75 default to keep the payload small.
    qualities: [65, 70, 72, 75],
  },
};

export default nextConfig;
