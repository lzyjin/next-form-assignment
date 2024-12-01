"use server";

import {z} from "zod";
import {db} from "@/lib/db";
import bcrypt from "bcrypt";
import {redirect} from "next/navigation";
import {getSession} from "@/lib/session";

async function checkUserExists (email: string) {
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

const formSchema = z.object({
  email: z.string().email("이메일 형식으로 입력하세요.").toLowerCase().refine(checkUserExists, "등록되지 않은 계정입니다."),
  password: z.string()
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

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

      redirect("/profile");

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