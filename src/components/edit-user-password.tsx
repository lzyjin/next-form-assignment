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
        <div className="flex items-center gap-3">
          <label htmlFor="password" className="w-28 shrink-0">새 비밀번호</label>
          <Input
            name="password"
            type="password"
            required={true}
            placeholder="영문소문자+영문대문자+숫자+특수문자 조합 10~16자리"
            errors={state?.fieldErrors.password}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="confirmPassword" className="w-28 shrink-0">새 비밀번호 확인</label>
          <Input
            name="confirmPassword"
            type="password"
            required={true}
            placeholder="영문소문자+영문대문자+숫자+특수문자 조합 10~16자리"
            errors={state?.fieldErrors.confirmPassword}
            className="flex-1"
          />
        </div>
      </div>
      <Button text="비밀번호 변경" />
    </form>
  );
}