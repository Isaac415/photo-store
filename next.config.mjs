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
    // Add these two options:
    output: 'standalone',
    experimental: {
      appDir: true
    }
  };
  
  export default nextConfig;