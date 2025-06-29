// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
    transpilePackages: [
        '@quickfra/core',
        '@quickfra/db',
        '@quickfra/logger',
        '@quickfra/utils',
        '@quickfra/types',
        '@quickfra/config',
        '@quickfra/auth',
    ],
    // Improved image optimization for Next.js 15
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;