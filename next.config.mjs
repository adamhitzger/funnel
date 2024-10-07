/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.paylibo.com",
                port: "",
                
            },
        ]
    }
};

export default nextConfig;
