/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_TEST_MODE: "yes",
    API_MOCK_MODE: "yes",
    BASE_URL_TEST: "/",
    BASE_URL: "/",
    CLIENT_APP_ID: "1234",
  },
  reactStrictMode: false,
};

export default nextConfig;
