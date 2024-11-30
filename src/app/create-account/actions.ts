"use server";

import {z} from "zod";
import {PASSWORD_REGEX} from "@/lib/constants";
import {db} from "@/lib/db";

const checkConfirmPassword = ({password, confirmPassword}: {password: string, confirmPassword: string}) => {
  return password === confirmPassword;
};

const formSchema = z.object({
  email: z.string().trim().email("올바른 이메일 형태로 입력하세요."),
  username: z.string().trim().min(3, "3글자 이상 입력하세요."),
  password: z.string().trim().min(5, "5글자 이상 입력하세요."),
      // .regex(PASSWORD_REGEX, "영어 소문자, 대문자, 숫자, 하나 이상의 특수문자(~#?!@$%^&*_-)를 반드시 포함해야 합니다."),
  confirmPassword: z.string().trim().min(5, "5글자 이상 입력하세요."),
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

  const result = formSchema.safeParse(data);

  if(!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // db에 저장
    // const user = db.user.

    console.log(result.data);
  }

}