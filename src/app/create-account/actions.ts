"use server";

import {z} from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, USERNAME_MIN_LENGTH} from "@/lib/constants";
import {db} from "@/lib/db";
import bcrypt from "bcrypt";
import {getSession} from "@/lib/session";

const checkConfirmPassword = ({password, confirmPassword}: {password: string, confirmPassword: string}) => {
  return password === confirmPassword;
};

const formSchema = z.object({
  username: z.string().trim().toLowerCase().min(USERNAME_MIN_LENGTH, "이름은 5글자 이상이여야 합니다."),
  email: z.string().trim().toLowerCase().email("이메일 형식으로 입력하세요."),
  password: z.string().trim().min(PASSWORD_MIN_LENGTH, "비밀번호는은 10글자 이상이여야 합니다."),
      // .regex(PASSWORD_REGEX, "영어 소문자, 대문자, 숫자, 하나 이상의 특수문자(~#?!@$%^&*_-)를 반드시 포함해야 합니다."),
  confirmPassword: z.string().trim().min(PASSWORD_MIN_LENGTH, "비밀번호는은 10글자 이상이여야 합니다."),
})
  .superRefine(async({username}, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "이미 존재하는 사용자입니다.",
        path: ["username"],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .superRefine(async({email}, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "이미 존재하는 사용자입니다.",
        path: ["email"],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .refine(checkConfirmPassword, {
    message: "비밀번호와 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data= {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.safeParseAsync(data);

  if(!result.success) {
    // console.log(result.error.flatten());
    console.log(result);
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

    // console.log(result);
  }
}