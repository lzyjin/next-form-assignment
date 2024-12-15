"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import {useFormState} from "react-dom";
import Link from "next/link";
import logIn from "@/services/user-service";

export default function LogIn() {
  const [state, formAction] = useFormState(logIn, null);

  return (
      <div className="flex pt-[10vh] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div>
          <h1 className="text-center font-bold text-2xl mb-5">짹짹 로그인하기 🐥</h1>
          <form action={formAction} className="flex flex-col gap-3 w-screen max-w-md">
            <Input name="email" type="email" required={true} placeholder="이메일" errors={state?.fieldErrors.email}/>
            <Input name="password" type="password" required={true} placeholder="비밀번호" errors={state?.fieldErrors.password}/>
            <Button text="로그인"/>
            <Link
              href="/create-account"
              className="w-full text-center leading-[48px] border border-amber-300 text-black rounded-full font-semibold">계정 생성</Link>
          </form>
        </div>
      </div>
  );
}