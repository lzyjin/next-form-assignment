"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import SuccessMessage from "@/components/success-message";
import {useFormState} from "react-dom";
import handleLogin from "@/app/actions";

export default function LogIn() {
  const [state, formAction] = useFormState(handleLogin, null);

  return (
      <div className="flex pt-[10vh] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div>
            <h1 className="mb-8 text-3xl text-center">로그인</h1>
            <form action={formAction} className="flex flex-col gap-3 w-screen max-w-md">
            <Input name="email" type="email" required={true} placeholder="Email" errors={state?.fieldErrors.email}/>
            <Input name="password" type="password" required={true} placeholder="Password"
                   errors={state?.fieldErrors.password}/>
            <Button text="Log in"/>
            {!state?.fieldErrors && <SuccessMessage text="Welcome back!"/>}
          </form>
        </div>
      </div>
  );
}