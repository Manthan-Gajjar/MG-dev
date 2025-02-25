/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nudefnihnnkkjaivntjr.supabase.co"], // Replace with your actual Supabase domain
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
