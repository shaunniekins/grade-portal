/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

require("next-env")();
const dotenvLoad = require("dotenv-load");
dotenvLoad();
