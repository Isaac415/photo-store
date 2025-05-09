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
    output: 'standalone',
  };
  
  export default nextConfig;