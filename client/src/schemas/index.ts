import { z } from "zod";
import Validator from "validator";

export const z_email = z.string().refine((value) => Validator.isEmail(value), {
  message: "Email is not valid.",
});

export const z_url = z.string().refine((value) => Validator.isURL(value), {
  message: "Url is not valid.",
});

const name = z.string();
const password = z.string();

export const UserSchema = z.object({
  name,
  password,
  email: z_email,
  preferredAppLanguage: z.string().optional(),
  profileImageUrl: z_url.optional(),
});

export const LoginSchema = z.object({
  email: z_email,
  password,
});
