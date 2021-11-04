/** @type {import('next').NextConfig} */
const isProd = process.env === "production";

module.exports = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    isProd,

    features: {},

    vars: {
      base_graphql_endpoint: "https://lkuoch.com",
      selector_options: {
        memoizeOptions: {
          maxSize: 256,
        },
      },
    },
  },
};
