/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/copilotkit/:path*',
        destination: 'http://localhost:2024/:path*'
      }
    ]
  }
}

module.exports = nextConfig 