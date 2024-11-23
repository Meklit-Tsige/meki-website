// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["@plaiceholder/next"],
};

export default withPlaiceholder(nextConfig);
