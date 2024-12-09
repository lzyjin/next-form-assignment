"use server";

import {db} from "@/lib/db";
import bcrypt from "bcrypt";
import {redirect} from "next/navigation";
import {getSession} from "@/lib/session";
import {loginSchema} from "@/lib/schemas";

export async function checkUserExists (email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return user;
}

export default async function login(prevState: unknown, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await loginSchema.safeParseAsync(data);

  if(!result.success) {
    return result.error.flatten();

  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user?.password ?? "");

    if (ok) {
      const session = await getSession();

      session.id = user!.id;

      await session.save();

      redirect("/");

    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 일치하지 않습니다."],
          email: [],
        }
      };
    }
  }
}