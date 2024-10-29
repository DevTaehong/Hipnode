/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cloudflare-ipfs.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "jjxiydcvcwtbswunystj.supabase.co" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "swjupfdgeytacaymyrhi.supabase.co" },
    ],
  },
};

module.exports = nextConfig;
