/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "assets.aceternity.com"
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**" // Allows all images from Unsplash
            }
        ]
    }
};

export default nextConfig;
