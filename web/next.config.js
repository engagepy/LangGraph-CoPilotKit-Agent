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

/** @type {import('next').NextConfig} */
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization,X-Api-Key' },
        ],
      },
    ];
  },
};