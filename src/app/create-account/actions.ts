"use server";

import {db} from "@/lib/db";
import bcrypt from "bcrypt";
import {getSession} from "@/lib/session";
import {createAccountSchema} from "@/lib/schemas";

export async function checkConfirmPassword({password, confirmPassword}: {password: string, confirmPassword: string}) {
  return password === confirmPassword;
}

export async function createAccount(prevState: unknown, formData: FormData) {
  const data= {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await createAccountSchema.safeParseAsync(data);

  if(!result.success) {
    return result.error.flatten();

  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      }
    });

    const session = await getSession();

    session.id = user.id;

    await session.save();
  }
}