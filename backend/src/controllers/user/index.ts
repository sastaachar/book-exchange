import Express from "express";
import { getLogger, requestValidatedHandler } from "@utils";
import { z } from "zod";
import { GetUserSchema, UpdateUserSchema, UserSchema, z_email } from "@schemas";
import { userService } from "@services";

const createUserDefaults: Partial<z.infer<typeof UserSchema>> = {
  preferredAppLanguage: "en",
};
const createUserRoute = requestValidatedHandler(
  {
    body: UserSchema,
  },
  async (req, res) => {
    const logger = getLogger("user/createUser");
    const createUserParams = { ...createUserDefaults, ...req.body };
    const [createUserResponse, error] =
      await userService.createUser(createUserParams);

    if (error || !createUserResponse) {
      res.status(400).send({
        error,
      });
      return;
    }

    res.status(200).send(createUserResponse);
    logger.log("Success, userId : ", createUserResponse.id);
  }
);

const isEmailValidRoute = requestValidatedHandler(
  {
    body: z.object({
      email: z_email,
    }),
  },
  async (req, res) => {
    const { email } = req.body;
    const [emailExists, error] = await userService.doesEmailExist(email);

    if (error) {
      res.status(500).send({ error });
    }

    if (!emailExists) {
      res.status(200).send({ valid: true });
      return;
    }

    res.status(200).send({ valid: false, message: "Email already exists." });
  }
);

export const getUserRoute = requestValidatedHandler(
  {
    params: GetUserSchema,
  },
  async (req, res) => {
    const userId = Number(req.params.userId);
    const [user, error] = await userService.getUser(userId);

    if (error || !user) {
      return res.status(400).send({ error });
    }

    return res.status(200).send(user);
  }
);

export const updateUserRoute = requestValidatedHandler(
  {
    params: z.object({ userId: z.number() }),
    body: UpdateUserSchema,
  },
  async (req, res) => {
    const userId = Number(req.params.userId);
    const [updatedUser, error] = await userService.updateUser(userId, req.body);

    if (error) {
      return res.status(400).send({ error: error.message });
    }

    return res.status(200).send(updatedUser);
  }
);

export const getUserRouter = () => {
  const userRouter = Express.Router();
  userRouter.post("/create", createUserRoute);
  userRouter.post("/is-email-valid", isEmailValidRoute);
  userRouter.post("/:userId", getUserRoute);
  userRouter.post("/:userId/update", updateUserRoute);

  return userRouter;
};
