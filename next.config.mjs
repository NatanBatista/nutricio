/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: `http://nutricio-lb-1109550295.us-east-1.elb.amazonaws.com/:path*`,
          },
        ];
      },
};

export default nextConfig;
