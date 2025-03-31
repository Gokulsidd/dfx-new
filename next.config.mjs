/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Only if you're using the App Router
      turbo: false, // Disable Turbopack
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals = [...config.externals];
      }
      return config;
    },
  };
  
 export default nextConfig