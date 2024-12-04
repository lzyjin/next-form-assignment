"use client";

import Input from "@/components/input";
import {useFormState} from "react-dom";
import {postTweet} from "@/components/add-tweet-actions";
import Button from "@/components/button";

export default function AddTweet() {
  const [state, action] = useFormState(postTweet, null);
  // console.log(state)
  // 등록 성공했을 때 리스트가 업데이트 되어야 하는데 바로바로 안됌. 어떻게 고치지?

  return (
    <div>
      <form action={action}>
        <Input
          name="content"
          type="text"
          required={true}
          // minLength={1}
          placeholder="무슨 일이 일어나고 있나요?"
          errors={state?.fieldErrors.content}
        />
        <Button text="게시하기"/>
      </form>
    </div>
  );
}