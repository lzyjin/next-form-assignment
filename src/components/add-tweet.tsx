"use client";

import {useFormState} from "react-dom";
import {postTweet} from "@/services/tweet-service";

export default function AddTweet() {
  const [state, action] = useFormState(postTweet, null);

  return (
    <div className="w-full bg-white px-5 py-3 border-b border-neutral-200">
      <form action={action} className="flex gap-2">
        <input
          name="content"
          type="text"
          placeholder="무슨 일이 일어나고 있나요?"
          required
          minLength={1}
          className="w-full bg-white py-2.5 px-5 outline-0 rounded-full border border-neutral-200"/>
        <button
          className="w-40 text-center h-12 bg-neutral-100 rounded-full font-bold disabled:bg-neutral-300 disabled:text-neutral-500">
          게시하기
        </button>
      </form>
    </div>
  );
}