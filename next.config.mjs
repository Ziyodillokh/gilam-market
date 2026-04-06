import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/shop',
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "grm-upload.getter.uz" },
      { protocol: "https", hostname: "s3.gilam-market.uz" },
      { protocol: "https", hostname: "test.ziyodulloh.uz" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  experimental: {
    optimizePackageImports: ["antd", "lucide-react", "react-masonry-css", "leaflet", "react-leaflet"],
  },
};

export default withNextIntl(nextConfig);
