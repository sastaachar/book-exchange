import { PrismaClient } from "@prisma/client";
import { LoginSchema, SafeUser, z_email } from "@schemas";
import { authService, userService } from "@services";
import { getEnv, requestValidatedHandler } from "@utils";
import Express from "express";
import jwt from "jsonwebtoken";

const setAccessToken = (res: Express.Response, loggedInUser: any) => {
  const accessToken = jwt.sign(loggedInUser, getEnv().JWT_SECRET, {
    expiresIn: getEnv().ACCESS_TOKEN_EXPIRATION,
  });
  res.cookie(getEnv().JWT_ACCESS_COOKIE_NAME, accessToken, {
    maxAge: 60 * 60 * 1000, // 1 hour
  });
};

const setRefreshToken = (res: Express.Response, loggedInUser: any) => {
  const accessToken = jwt.sign(loggedInUser, getEnv().REFRESH_TOKEN_SECRET, {
    expiresIn: getEnv().REFRESH_TOKEN_EXPIRATION,
  });
  res.cookie(getEnv().JWT_REFRESH_COOKIE_NAME, accessToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const authenticate: Express.RequestHandler = async (req, res, next) => {
  const unAuthError = { error: "Unauthorized: Invalid token provided" };
  try {
    const token =
      req.cookies?.[getEnv().JWT_ACCESS_COOKIE_NAME] ||
      req.headers.authorization?.split(" ")[1];

    try {
      const decoded = jwt.verify(token, getEnv().JWT_SECRET) as SafeUser;
      if (!decoded?.email) throw { message: "Invalid token" };
      req.user = decoded;
      return next();
    } catch (e) {}

    const refreshToken = req.cookies?.[getEnv().JWT_REFRESH_COOKIE_NAME];
    if (!refreshToken) {
      return res.status(401).send(unAuthError);
    }

    try {
      const decodedUser = jwt.verify(
        refreshToken,
        getEnv().REFRESH_TOKEN_SECRET
      ) as SafeUser;

      if (!decodedUser?.email) {
        return res.status(401).send(unAuthError);
      }

      const [userToStore, userError] = await userService.getUser(
        decodedUser.id
      );
      if (userError) throw userError;
      setAccessToken(res, userToStore);
      setRefreshToken(res, userToStore);

      req.user = decodedUser;

      return next();
    } catch (e) {
      return res.status(401).send(unAuthError);
    }
  } catch (err) {
    return res.status(401).send(unAuthError);
  }
};

const loginRoute = requestValidatedHandler(
  {
    body: LoginSchema,
  },
  async (req, res) => {
    const [loggedInUser, loginError] = await authService.login(req.body);

    if (loggedInUser && !loginError) {
      setAccessToken(res, loggedInUser);
      setRefreshToken(res, loggedInUser);

      res.status(200).send({
        message: "Login successful",
        user: loggedInUser,
      });

      return;
    }

    res.status(401).send({
      error: {
        message: "User or Password is incorrect",
      },
    });
  }
);

const isLoggedInRoute = requestValidatedHandler({}, async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).send();

  const [userLogged, getUserError] = await userService.getUser(user.id);

  if (getUserError) return res.status(400).send({ error: getUserError });

  return res.status(200).send(userLogged);
});

const logoutRoute = requestValidatedHandler({}, (req, res) => {
  res.clearCookie(getEnv().JWT_ACCESS_COOKIE_NAME);
  res.clearCookie(getEnv().JWT_REFRESH_COOKIE_NAME);
  res.status(200).send();
});

export const getAuthRouter = () => {
  const router = Express.Router();
  router.post("/login", loginRoute);
  router.get("/is-logged-in", isLoggedInRoute);
  router.get("/logout", logoutRoute);

  return router;
};
