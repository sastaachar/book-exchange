export const getEnv = (env = process.env || {}) => {
  return {
    JWT_SECRET: env.JWT_SECRET || "your_jwt_secret",
    REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET || "your_refresh_secret",
    ACCESS_TOKEN_EXPIRATION: env.ACCESS_TOKEN_EXPIRATION || "1h",
    REFRESH_TOKEN_EXPIRATION: env.REFRESH_TOKEN_EXPIRATION || "7d",
    DATABASE_URL: env.DATABASE_URL,
    CORS_DOMAINS: env.CORS_DOMAINS || "http://localhost:3000",
    JWT_REFRESH_COOKIE_NAME:
      env.JWT_REFRESH_COOKIE_NAME || "JSTNM_REFRESH_TOKEN",
    JWT_ACCESS_COOKIE_NAME: env.JWT_ACCESS_COOKIE_NAME || "JSTNM_ACCESS",
  };
};
