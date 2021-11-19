/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  graphql: "http://localhost:6060/grapql",
  file_server: "http://localhost:4000",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
