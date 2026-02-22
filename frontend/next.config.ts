/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "crm-base-storage.5b1082ca8d9def07cf0a0cb57b422d2f.r2.cloudflarestorage.com",
        pathname: "/**", // permite todas as pastas/arquivos
      },
    ],
  },
};

module.exports = nextConfig;
