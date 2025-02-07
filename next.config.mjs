/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "resources.premierleague.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "ramiyone.com" },
      { protocol: "https", hostname: "api.ramiyone.com" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
