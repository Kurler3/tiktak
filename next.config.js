/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['64.media.tumblr.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
