/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: ['static-cdn.jtvnw.net'],
        unoptimized: true,
    },
};

export default nextConfig;
