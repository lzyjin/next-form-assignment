"use server";

import {z} from "zod";
import {PASSWORD_REGEX} from "@/lib/constants";

const formSchema = z.object({
  email: z.string().email().includes("@zod.com", {
    message: "Only @zod.com emails are allowed"
  }),
  username: z.string().min(5, {
    message: "Username should be at least 5 characters long"
  }),
  password: z.string().min(10, {
    message: "Password should be at least 10 characters long"
  }).regex(PASSWORD_REGEX, {
    message: "Password should contain at least one number (0123456789)"
  }),
});

export default async function handleLogin(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  if(!result.success) {
    return result.error.flatten();
  }
}