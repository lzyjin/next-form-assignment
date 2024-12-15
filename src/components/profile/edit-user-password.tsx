"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import {useFormState} from "react-dom";
import {editUserPassword} from "@/services/user-service";

export default function EditUserPassword() {
  const [state, action] = useFormState(editUserPassword, null);

  return (
    <form action={action}>
      <div className="w-full flex flex-col gap-3 mb-5">
        <div className="flex flex-col items-center gap-3 sm:flex-row has-[input]:placeholder:text-sm">
          <label htmlFor="password" className="block w-full shrink-0 sm:w-28">새 비밀번호</label>
          <Input
            name="password"
            type="password"
            required={true}
            placeholder="소문자+대문자+숫자+특수문자 조합 10~16자리"
            errors={state?.fieldErrors.password}
          />
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <label htmlFor="confirmPassword" className="block w-full shrink-0 sm:w-28">새 비밀번호 확인</label>
          <Input
            name="confirmPassword"
            type="password"
            required={true}
            placeholder="소문자+대문자+숫자+특수문자 조합 10~16자리"
            errors={state?.fieldErrors.confirmPassword}
          />
        </div>
      </div>
      <Button text="비밀번호 변경" />
    </form>
  );
}