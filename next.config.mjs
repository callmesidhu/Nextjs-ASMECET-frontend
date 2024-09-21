/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['i.pinimg.com','firebasestorage.googleapis.com'], // Add the external domains here
    },
  };

export default nextConfig;
