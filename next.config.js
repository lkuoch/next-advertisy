/** @type {import('next').NextConfig} */
const isProd = process.env === "production";

module.exports = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    isProd,

    features: {},

    vars: {
      baseGraphQLEndpoint: "https://lkuoch.com",
    },
  },
};
