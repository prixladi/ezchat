/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  env: {
    NEXT_PUBLIC_shiiit: 'my-value',
  },
};
