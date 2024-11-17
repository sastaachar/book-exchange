import { serviceWrapper } from "@utils";
import { Server } from "./common";
import { User, CreateUserInput } from "@appTypes";

export const createUser = serviceWrapper(async (args: CreateUserInput) => {
  const res = await Server.post({
    path: "/user/create",
    params: args,
  });
  const user = (await res.json()) as User;
  return user;
});

export const updateUser = serviceWrapper(
  async (userId: number, userParams: Partial<User>) => {
    const res = await Server.post({
      path: `/user/${userId}/update`,
      params: userParams,
    });
    const updatedUser = (await res.json()) as User;
    return updatedUser;
  }
);

export const getUser = serviceWrapper(async (userId: number) => {
  const res = await Server.get({
    path: `/user/${userId}`,
  });
  const user = (await res.json()) as User;
  return user;
});

export const doesEmailExist = serviceWrapper(
  async (email: string): Promise<boolean> => {
    const res = await Server.post({
      path: "/user/is-email-valid",
      params: { email },
    });

    const resJson = await res.json();

    if (!res.ok) throw resJson.error;

    return resJson?.valid;
  }
);
