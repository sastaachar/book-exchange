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

export const GetUserSchema = z.object({
  userId: z.number().min(1), // Ensure `userId` is a positive integer
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  preferredAppLanguage: z.string().optional(),
  profileImageUrl: z_url.optional(),
});

export const z_location = z.string().min(1, "Location must be specified.");

const bookName = z.string().min(1, "Book name cannot be empty.");
const bookAuthor = z.string().min(1, "Author name cannot be empty.");

export const BookQueueSchema = z.object({
  bookName,
  bookAuthor,
  exchangeLocation: z_location,
});

export type SafeBookQueue = z.infer<typeof BookQueueSchema>;

export const GetBookQueueSchema = z.object({
  bookQueueId: z.number().min(1, "BookQueue ID must be a positive integer."),
});

export const UpdateBookQueueSchema = z.object({
  bookName: bookName.optional(),
  bookAuthor: bookAuthor.optional(),
  exchangeLocation: z_location.optional(),
});
