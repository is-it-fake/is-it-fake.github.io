/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

export default nextConfig;
