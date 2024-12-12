import {z} from "zod";
import {
  BIO_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX, USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from "@/lib/constants";
import {db} from "@/lib/db";
import {getSession} from "@/lib/session";
import {checkConfirmPassword, checkUserExists} from "@/services/user-service";

export const createAccountSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(USERNAME_MIN_LENGTH, "이름은 1글자 이상이여야 합니다.")
    .max(USERNAME_MAX_LENGTH, "이름은 20글자 이하여야 합니다."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("이메일 형식으로 입력하세요."),
  password: z
    .string()
    .trim()
    .min(PASSWORD_MIN_LENGTH, "비밀번호는은 10글자 이상이여야 합니다.")
    .max(PASSWORD_MAX_LENGTH, "비밀번호는은 16글자 이하여야 합니다.")
    .regex(PASSWORD_REGEX, "영어 소문자, 대문자, 숫자, 하나 이상의 특수문자(~#?!@$%^&*_-)를 반드시 포함해야 합니다."),
  confirmPassword: z
    .string()
    .trim()
    .min(PASSWORD_MIN_LENGTH, "비밀번호는은 10글자 이상이여야 합니다.")
    .max(PASSWORD_MAX_LENGTH, "비밀번호는은 16글자 이하여야 합니다.")
    .regex(PASSWORD_REGEX, "영어 소문자, 대문자, 숫자, 하나 이상의 특수문자(~#?!@$%^&*_-)를 반드시 포함해야 합니다."),
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

export const loginSchema = z.object({
  email: z
    .string()
    .email("이메일 형식으로 입력하세요.")
    .toLowerCase()
    .refine(checkUserExists, "등록되지 않은 계정입니다."),
  password: z
    .string()
});

export const tweetResponseSchema = z
  .string()
  .trim()
  .min(1);

export const addTweetSchema = z.object({
  content: z
    .string({
      required_error: "내용을 입력하세요."
    })
    .trim()
    .min(1, "한글자 이상 입력하세요.")
    .max(200, "최대 200글자까지 입력할 수 있습니다."),
});

export const editUserInfoSchema = z.object({
  username: z
    .string()
    .trim()
    .min(USERNAME_MIN_LENGTH, "이름은 1글자 이상이여야 합니다.")
    .max(USERNAME_MAX_LENGTH, "이름은 20글자 이하여야 합니다."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("이메일 형식으로 입력하세요."),
  bio: z
    .string()
    .min(BIO_MIN_LENGTH, "자기소개는 1글자 이상이여야 합니다."),
})
  .superRefine(async({username}, ctx) => {
    const session = await getSession();

    const user = await db.user.findUnique({
      where: {
        username
      },
      select: {
        id: true,
      },
    });

    if (user && session.id !== user.id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "이미 사용중인 이름입니다.",
        path: ["username"],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .superRefine(async({email}, ctx) => {
    const session = await getSession();

    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true,
      },
    });

    if (user && session.id !== user.id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "이미 존재하는 이메일입니다.",
        path: ["email"],
        fatal: true,
      });

      return z.NEVER;
    }
  });

export const editUserPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(PASSWORD_MIN_LENGTH, "비밀번호는은 10글자 이상이여야 합니다.")
    .max(PASSWORD_MAX_LENGTH, "비밀번호는은 16글자 이하여야 합니다.")
    .regex(PASSWORD_REGEX, "영어 소문자, 대문자, 숫자, 하나 이상의 특수문자(~#?!@$%^&*_-)를 반드시 포함해야 합니다."),
  confirmPassword: z
    .string()
    .trim()
    .min(PASSWORD_MIN_LENGTH, "비밀번호는은 10글자 이상이여야 합니다.")
    .max(PASSWORD_MAX_LENGTH, "비밀번호는은 16글자 이하여야 합니다.")
    .regex(PASSWORD_REGEX, "영어 소문자, 대문자, 숫자, 하나 이상의 특수문자(~#?!@$%^&*_-)를 반드시 포함해야 합니다."),
})
  .refine(checkConfirmPassword, {
    message: "새 비밀번호와 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
