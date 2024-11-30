"use server";

import {z} from "zod";
import {PASSWORD_REGEX} from "@/lib/constants";

const checkConfirmPassword = ({password, confirmPassword}: {password: string, confirmPassword: string}) => {
  return password === confirmPassword;
};

const formSchema = z.object({
  email: z.string().trim().email("올바른 이메일 형태로 입력하세요."),
  username: z.string().trim().min(3, "3글자 이상 입력하세요."),
  password: z.string().trim().min(5, "5글자 이상 입력하세요.").regex(PASSWORD_REGEX, "영어 소문자, 대문자, 숫자, 하나 이상의 특수문자(~#?!@$%^&*_-)를 반드시 포함해야 합니다."),
  confirmPassword: z.string().trim().min(5, "5글자 이상 입력하세요."),
})
  .refine(checkConfirmPassword, "비밀번호와 일치하지 않습니다.");

export async function createAccount(prevState: any, formData: FormData) {
  const data= {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  }
}