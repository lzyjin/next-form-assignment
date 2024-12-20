"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import {useFormState} from "react-dom";
import {createAccount} from "@/services/user-service";
import Link from "next/link";

export default function CreateAccountPage() {
  const [state, formAction] = useFormState(createAccount, null);

  return (
    <div className="flex pt-[10vh] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div>
        <h1 className="text-center font-bold text-2xl mb-5">짹짹 가입하기 🐣</h1>
        <form action={formAction} className="flex flex-col gap-3 w-screen max-w-md px-5 md:px-0">
          <Input name="username" type="text" required={true} placeholder="이름" errors={state?.fieldErrors.username}/>
          <Input name="email" type="email" required={true} placeholder="이메일" errors={state?.fieldErrors.email}/>
          <Input name="password" type="password" required={true} placeholder="비밀번호"
                 errors={state?.fieldErrors.password}/>
          <Input name="confirmPassword" type="password" required={true} placeholder="비밀번호 확인"
                 errors={state?.fieldErrors.confirmPassword}/>
          <Button text="계정 생성"/>
          {state !== null && !state?.fieldErrors}
          <div className="w-full h-[1px] bg-neutral-200 my-5 mx-auto"/>
          <Link
            href="/log-in"
            className="w-full text-center leading-[48px] border border-amber-300 text-amber-300 rounded-full font-semibold">로그인</Link>
        </form>
      </div>
    </div>
  );
}