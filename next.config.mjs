/** @type {import('next').NextConfig} */
const nextConfig = {};
const nextConfig = {
  typescript: {
    // We run tsc in CI/tests separately to prevent Windows path slash normalization issues in Next.js CLI
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
