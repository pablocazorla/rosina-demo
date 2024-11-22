const baseURL =
  process.env.API_TEST_MODE === "yes"
    ? process.env.BASE_URL_TEST
    : process.env.BASE_URL;

const apiConfig = {
  timeout: 60000, // 1 minute
  baseURL,
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
    Clientappid: process.env.CLIENT_APP_ID,
  },
};

export const DAYS_EXPIRE_TOKEN = 7;

export const COOKIE_AUTH_TOKEN = "auth_token_rosina";

export default apiConfig;
