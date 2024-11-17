import { serviceWrapper } from "@utils";
import { z } from "zod";
import { LoginSchema } from "@schemas";
import { Server } from "./common";
import { User } from "@appTypes";

export const login = serviceWrapper(
  async (args: z.infer<typeof LoginSchema>): Promise<User> => {
    const res = await Server.post({
      path: "/auth/login",
      params: args,
    });

    const resJson = await res.json();

    if (!res.ok) throw resJson.error;

    return resJson as User;
  }
);

export const isLoggedIn = serviceWrapper(async (): Promise<User> => {
  const res = await Server.get({ path: "/auth/is-logged-in" });
  const resJson = await res.json();

  if (!res.ok) throw resJson.error;

  return resJson as User;
});
export const logout = serviceWrapper(async (): Promise<boolean> => {
  const res = await Server.get({ path: "/auth/logout" });
  return res.ok;
});
