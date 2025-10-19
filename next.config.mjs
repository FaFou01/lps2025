/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        domains: ['static-cdn.jtvnw.net'],
        unoptimized: true,
    },
};

export default nextConfig;
