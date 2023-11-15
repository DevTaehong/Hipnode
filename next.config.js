/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cloudflare-ipfs.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "jjxiydcvcwtbswunystj.supabase.co" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

module.exports = nextConfig;
