/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'cloudflare-ipfs.com',
      'avatars.githubusercontent.com',
      'loremflickr.com',
    ],
  },
};

module.exports = nextConfig;
