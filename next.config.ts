import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Конфигурация webpack нужна только в dev для Hot Reload в Docker
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;