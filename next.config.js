/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'cloudflare-ipfs.com',
      'avatars.githubusercontent.com',
      'jjxiydcvcwtbswunystj.supabase.co',
    ],
  },
};

module.exports = nextConfig;
