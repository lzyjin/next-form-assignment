"use client";

import {useFormState} from "react-dom";
import {postTweet} from "@/services/tweet-service";
import {useRef, useState} from "react";

export default function AddTweet() {
  const [state, action] = useFormState(postTweet, null);
  const [tweetLength, setTweetLength] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onkeyup = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    textareaRef.current!.style.height = "auto";
    textareaRef.current!.style.height = e.currentTarget.scrollHeight + "px";

    setTweetLength(e.currentTarget.value.length);
  };

  return (
    <div className="w-full bg-white px-5 py-3 border-b border-neutral-200">
      <form action={action} className="flex flex-col gap-2">
        <div className="w-full">
          <textarea
            name="content"
            id=""
            placeholder="무슨 일이 일어나고 있나요?"
            minLength={1}
            maxLength={200}
            required
            className="w-full outline-0 border-0 text-black font-medium text-lg overflow-y-hidden resize-none"
            onKeyUp={onkeyup}
            ref={textareaRef}
          />
        </div>
        {
          state?.fieldErrors.content && <p className="w-full text-red-600 my-1 text-sm text-left">{state?.fieldErrors.content}</p>
        }
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-400">{tweetLength}/200</p>
          <button
            className="w-24 text-center h-9 bg-amber-300 text-white rounded-full font-bold
          disabled:bg-neutral-300 disabled:text-neutral-500">
            게시하기
          </button>
        </div>
      </form>
    </div>
  );
}