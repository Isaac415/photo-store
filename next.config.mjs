/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'alcenodlfaowuunmcvbt.supabase.co'
            }
        ]
    },
    // Add this:
    output: 'standalone' // or 'auto' if using Next.js 13+
};

export default nextConfig;