/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "https://my-components-taupe.vercel.app",
    "http://localhost:3000",
    "https://drag-drop-bt8b.onrender.com",
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
