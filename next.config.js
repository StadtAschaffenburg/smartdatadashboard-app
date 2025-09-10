/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: { dynamicTyping: true, header: true, skipEmptyLines: true },
    })
    config.module.rules.push({ test: /\.md$/, type: 'asset/source' })
    return config
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'http://dashboard-cms.aschaffenburg.de' },
    ],
  },
}

module.exports = nextConfig
