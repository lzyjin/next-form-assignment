"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import {useFormState} from "react-dom";
import login from "@/app/log-in/actions";

export default function LogIn() {
  const [state, formAction] = useFormState(login, null);

  return (
      <div className="flex pt-[10vh] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div>
            {/*<h1 className="mb-8 text-3xl text-center">로그인</h1>*/}
            <form action={formAction} className="flex flex-col gap-3 w-screen max-w-md">
            <Input name="email" type="email" required={true} placeholder="이메일" errors={state?.fieldErrors.email}/>
            <Input name="password" type="password" required={true} placeholder="비밀번호" errors={state?.fieldErrors.password}/>
            <Button text="로그인"/>
          </form>
        </div>
      </div>
  );
}