/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
      },
    })
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'http://dashboard-cms.aschaffenburg.de',
      },
    ],
  },
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  cacheStartUrl: '/',
  disable: true, //process.env.NODE_ENV === 'development',
})

module.exports = withPWA(nextConfig)
