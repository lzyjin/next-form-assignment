"use client";

import Input from "@/components/input";
import handleLogin from "@/app/actions";
import Button from "@/components/button";
import {useFormState} from "react-dom";
import SuccessMessage from "@/components/success-message";

export default function Home() {
  const [state, formAction] = useFormState(handleLogin, null);

  return (
    <div className="flex pt-[10vh] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div>
        <div className="mb-8 text-3xl text-center">🐨</div>
        <form action={formAction} className="flex flex-col gap-3 w-screen max-w-md">
          <Input name="email" type="email" required={true} placeholder="Email" errors={state?.fieldErrors.email} />
          <Input name="username" type="text" required={true} placeholder="Username" errors={state?.fieldErrors.username} />
          <Input name="password" type="password" required={true} placeholder="Password" errors={state?.fieldErrors.password} />
          <Button text="Log in" />
          { !state?.fieldErrors && <SuccessMessage text="Welcome back!" /> }
        </form>
      </div>
    </div>
  );
}
