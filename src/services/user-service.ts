"use server";

import {db} from "@/lib/db";
import {createAccountSchema, editUserInfoSchema, editUserPasswordSchema, loginSchema} from "@/lib/schemas";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";

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

export default async function logIn(prevState: unknown, formData: FormData) {
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

export async function logOut() {
  const session = await getSession();
  session.destroy();

  redirect("/log-in");
}

export async function checkConfirmPassword({password, confirmPassword}: {password: string, confirmPassword: string}) {
  return password === confirmPassword;
}

export async function createAccount(_: unknown, formData: FormData) {
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

    redirect("/");
  }
}

export async function getLoggedInUsername(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    }
  });
  return user?.username;
}

export async function getUserInfo(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

export async function editUserInfo(_: unknown, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
  };

  const result = await editUserInfoSchema.safeParseAsync(data);
  const session = await getSession();
  const userId = session.id!;

  if (!result.success) {
    return result.error.flatten();

  } else {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username: result.data.username,
        email: result.data.email,
        bio: result.data.bio,
      },
      select: {
        id: true,
        username: true,
      }
    });

    redirect(`/users/${updatedUser.username}`);

  }
}

export async function editUserPassword(_: unknown, formData: FormData) {
  const data = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await editUserPasswordSchema.safeParseAsync(data);
  const session = await getSession();
  const userId = session.id!;

  if (!result.success) {
    return result.error.flatten();

  } else {

    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    console.log(result.data);
    console.log(hashedPassword);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
      select: {
        id: true,
      }
    });

    await logOut();
  }
}