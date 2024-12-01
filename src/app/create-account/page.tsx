"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import SuccessMessage from "@/components/success-message";
import {useFormState} from "react-dom";
import {createAccount} from "@/app/create-account/actions";

export default function CreateAccountPage() {
  const [state, formAction] = useFormState(createAccount, null);
  console.log(state?.fieldErrors);

  return (
    <div className="flex pt-[10vh] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div>
        {/*<h1 className="mb-8 text-3xl text-center">계정 생성</h1>*/}
        <form action={formAction} className="flex flex-col gap-3 w-screen max-w-md">
          <Input name="username" type="text" required={true} placeholder="이름" errors={state?.fieldErrors.username}/>
          <Input name="email" type="email" required={true} placeholder="이메일" errors={state?.fieldErrors.email}/>
          <Input name="password" type="password" required={true} placeholder="비밀번호" errors={state?.fieldErrors.password}/>
          <Input name="confirmPassword" type="password" required={true} placeholder="비밀번호 확인" errors={state?.fieldErrors.confirmPassword}/>
          <Button text="계정 생성"/>
          { state !== null  && !state?.fieldErrors && <SuccessMessage text="계정이 생성되었습니다." link={{url: "/log-in", name: "로그인"}} />}
        </form>
      </div>
    </div>
  );
}