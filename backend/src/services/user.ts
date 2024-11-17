// src/services/UserService.ts
import { prisma } from "@database";
import { SafeUser, UserSchema } from "@schemas";
import { hashPassword, serviceWrapper } from "@utils";
import _ from "lodash";
import { z } from "zod";

/**
 * Creates a new user in the database with the provided data.
 *
 * @param {Partial<z.infer<typeof UserSchema>>} userParams - The parameters for the new user.
 * @returns {Promise<ReturnType<typeof prisma.user.create>>} - The newly created user.
 */
export const createUser = serviceWrapper(
  async (userParams: z.infer<typeof UserSchema>): Promise<SafeUser> => {
    const { password } = userParams;
    const encrypTedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { ...userParams, password: encrypTedPassword },
    });
    return _.omit(user, ["password"]);
  }
);

/**
 * Checks if an email is valid (i.e., not already used by another user).
 *
 * @param {string} email - The email to check.
 * @returns {Promise<boolean>} - Whether the email is valid (not already used).
 */
export const doesEmailExist = serviceWrapper(
  async (email: string): Promise<boolean> => {
    const emailCount = await prisma.user.count({
      where: {
        email: {
          equals: email,
        },
      },
    });

    return emailCount === 0; // If 0 emails found, email is valid
  }
);

/**
 * Updates an existing user in the database with the provided data.
 *
 * @param {number} userId - The ID of the user to be updated.
 * @param {Partial<z.infer<typeof UserSchema>>} userParams - The parameters for updating the user.
 * @returns {Promise<SafeUser>} - The updated user, excluding the password field.
 */
export const updateUser = serviceWrapper(
  async (
    userId: number,
    userParams: Partial<z.infer<typeof UserSchema>>
  ): Promise<SafeUser> => {
    const { password, ...restParams } = userParams;

    const updatedData = {
      ...restParams,
      ...(password ? { password: await hashPassword(password) } : {}),
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    // Exclude password from returned user
    return _.omit(updatedUser, ["password"]);
  }
);

/**
 * Retrieves a user's details from the database.
 *
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<SafeUser>} - The user details, excluding the password field.
 */
export const getUser = serviceWrapper(
  async (userId: number): Promise<SafeUser | null> => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return _.omit(user, ["password"]);
  }
);
