"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import {useFormState} from "react-dom";
import {EditUserInfoProps} from "@/lib/types";
import {useState} from "react";
import {editUserInfo} from "@/services/user-service";

export default function EditUserInfo({username, email, bio}: EditUserInfoProps) {
  const [usernameState, setUsernameState] = useState(username);
  const [emailState, setEmailState] = useState(email);
  const [bioState, setBioState] = useState(bio);

  const [state, action] = useFormState(editUserInfo, null);

  return (
    <form action={action}>
      <div className="w-full flex flex-col gap-3 mb-5">
        <div className="w-full flex items-center gap-3">
          <label htmlFor="username" className="w-28 shrink-0">사용자이름</label>
          <Input
            name="username"
            type="text"
            required={true}
            placeholder=""
            errors={state?.fieldErrors.username}
            value={usernameState}
            onChange={(e) => setUsernameState(e.currentTarget.value)} />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="email" className="w-28 shrink-0">이메일</label>
          <Input
            name="email"
            type="email"
            required={true}
            placeholder=""
            errors={state?.fieldErrors.email}
            value={emailState}
            disabled={true}
            onChange={(e) => setEmailState(e.currentTarget.value)} />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="bio" className="w-28 shrink-0">자기소개</label>
          <Input
            name="bio"
            type="text"
            required={false}
            placeholder=""
            errors={state?.fieldErrors.bio}
            value={bioState ?? ""}
            onChange={(e) => setBioState(e.currentTarget.value)} />
        </div>

      </div>
      <Button text="기본정보 수정" />
    </form>
  );
}