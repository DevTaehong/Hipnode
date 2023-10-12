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
      'jjxiydcvcwtbswunystj.supabase.co',
    ],
  },
};

module.exports = nextConfig;
