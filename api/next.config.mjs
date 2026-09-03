// api/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['mac-mini.tail0f16ec.ts.net'],
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-User-Seed, x-client-secret",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
