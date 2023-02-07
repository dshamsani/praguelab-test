/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["d35xwkx70uaomf.cloudfront.net"],
  },
  remotePatterns: [{ protocol: "https:", hostname: "**.cloudfront.net" }],
};
