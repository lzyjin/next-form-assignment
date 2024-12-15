"use client";

import {useFormState} from "react-dom";
import {editTweet, postTweet} from "@/services/tweet-service";
import {useEffect, useRef, useState} from "react";
import {Tweet} from "@/lib/types";

export default function FormTweet({currentTweet}: {currentTweet: Tweet | null}) {
  const isEditPage = currentTweet !== null;
  const [state, action] = useFormState(isEditPage ? editTweet : postTweet, null);
  const [tweetLength, setTweetLength] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditPage) {
      setTweetLength(currentTweet.tweet.length);
    }
  }, [currentTweet?.tweet.length, isEditPage]);

  const onkeyup = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    textareaRef.current!.style.height = "auto";
    textareaRef.current!.style.height = e.currentTarget.scrollHeight + "px";

    setTweetLength(e.currentTarget.value.length);
  };

  return (
    <form action={action} className="flex flex-col gap-2">

      { isEditPage && <input name="tweetId" type="hidden" value={currentTweet.id} /> }

      <div className="w-full">
        <textarea
          name="content"
          id=""
          placeholder="무슨 일이 일어나고 있나요?"
          minLength={1}
          maxLength={200}
          required
          className="w-full outline-0 border-0 bg-transparent text-black font-medium text-lg overflow-y-hidden resize-none dark:text-[#e7e9ea]"
          onKeyUp={onkeyup}
          ref={textareaRef}
          defaultValue={currentTweet?.tweet}
        />
      </div>

      {
        state?.fieldErrors.content &&
        <p className="w-full text-red-600 my-1 text-sm text-left">{state?.fieldErrors.content}</p>
      }

      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-400 dark:text-[#71767b]">{tweetLength}/200</p>
        <button
          className="w-24 text-center h-9 bg-amber-300 text-white rounded-full font-bold
            disabled:bg-neutral-300 disabled:text-neutral-500"
        >
          { isEditPage ? "수정하기" : "게시하기" }
        </button>
      </div>

    </form>
  );
}