import express from "express";
import { getUserRouter } from "./controllers/user";
import cors from "cors";
import { authenticate, getAuthRouter } from "./controllers/auth";
import cookieParser from "cookie-parser";
import { getEnv } from "@utils";
import dotenv from "dotenv";
import { getBookQueue } from "./services/book-queue";
import { getBookQueueRouter } from "./controllers/book-queue";

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3002;

var corsOptions = {
  origin: getEnv().CORS_DOMAINS || "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const publicRoutes = [
  "/auth/login",
  "/user/signup",
  "/user/create",
  "/user/is-email-valid",
];

app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  return authenticate(req, res, next);
});

app.use("/user", getUserRouter());
app.use("/auth", getAuthRouter());
app.use("/book-queue", getBookQueueRouter());

app.get("/status", (req, res) => {
  res.send({
    bruv: "we running",
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
