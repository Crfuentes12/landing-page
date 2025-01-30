// next.config.ts
import type { NextConfig } from 'next'
import type { Configuration as WebpackConfig } from 'webpack'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  },
  webpack: (config: WebpackConfig, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Ensure module and rules exist
    if (!config.module) {
      config.module = {
        rules: []
      };
    }
    if (!config.module.rules) {
      config.module.rules = [];
    }

    // Add the rule for .lottie files
    config.module.rules.push({
      test: /\.lottie$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });

    return config;
  },
};

export default nextConfig;