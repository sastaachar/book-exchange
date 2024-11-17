import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_refresh_secret";
const ACCESS_TOKEN_EXPIRATION = "1h"; // Access token expires in 1 hour
const REFRESH_TOKEN_EXPIRATION = "7d"; // Refresh token expires in 7 days

export const generateAccessToken = (user: object) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION }); // 1-hour expiry
};

export const generateRefreshToken = (user: object) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  }); // 7-day expiry
};
