/**
 * @type { import('next').NextConfig }
 */
const conf = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  swcMinify: true,
  compress: true,
  images: {
    domains: ['www.tropicanabrandsgroup.com']
  }
}

export default conf
