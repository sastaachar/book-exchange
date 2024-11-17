import { prisma } from "@database";
import { LoginSchema, SafeUser } from "@schemas";
import { comparePassword, serviceWrapper } from "@utils";
import { z } from "zod";
import _ from "lodash";

export const login = serviceWrapper(
  async (args: z.infer<typeof LoginSchema>): Promise<SafeUser> => {
    const didNotMatchError = { message: "Username or password did not match." };
    try {
      const userDetails = await prisma.user.findUniqueOrThrow({
        where: {
          email: args.email,
        },
      });

      const didPasswordMatch = await comparePassword(
        args.password,
        userDetails.password
      );

      if (didPasswordMatch) {
        // TODO : Remove this
        return _.omit(userDetails, ["password"]);
      }

      throw didNotMatchError;
    } catch (e) {
      throw e;
    }
  }
);
