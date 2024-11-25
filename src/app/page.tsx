"use client";

import Input from "@/components/input";
import handleLogin from "@/app/actions";
import Button from "@/components/button";
import {useFormState} from "react-dom";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const [state, formAction] = useFormState(handleLogin, null);

  return (
    <div className="flex pt-[10vh] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div>
        <div className="mb-8 text-3xl text-center">🐨</div>
        <form action={formAction} className="flex flex-col gap-3 w-screen max-w-md">
          <Input name="email" type="email" required={true} placeholder="Email"/>
          <Input name="username" type="text" required={true} placeholder="Username"/>
          <Input name="password" type="password" required={true} placeholder="Password" error={state?.success === false ? state.message : undefined}/>
          <Button text="Log in" />
          {
            state?.success === true &&
            <div className="bg-emerald-500 text-black flex items-center gap-3 p-4 rounded-xl">
              <CheckBadgeIcon className="h-6 w-6"/>
              <span>{state.message}</span>
            </div>
          }
        </form>
      </div>
    </div>
  );
}
