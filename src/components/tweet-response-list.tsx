"use client";

import {formatDate} from "@/lib/utils";
import {useOptimistic, useRef} from "react";
import {useFormState} from "react-dom";
import {tweetResponseSchema} from "@/lib/schemas";
import {TweetResponseListProps} from "@/lib/types";
import {addTweetResponse} from "@/services/tweet-service";

export default function TweetResponseList({tweetId, userId, username, responses}: TweetResponseListProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticState, addOptimistic] = useOptimistic(
    responses,
    (currentState, optimisticValue: string) => [
        ...currentState,
      {
        id: 0,
        created_at: new Date(),
        updated_at: new Date(),
        response: optimisticValue,
        userId,
        tweetId,
        user: {
          id: userId,
          username,
        }
      },
    ]
  );

  const formAction = async (_: unknown, formData: FormData) => {
    const response = formData.get("response");

    const result = tweetResponseSchema.safeParse(response);

    if (!result.success) {
      return result.error.flatten();

    } else {
      addOptimistic(result.data);
      formRef.current!.reset();
      await addTweetResponse(formData);
    }
  };

  const [state, action] = useFormState(formAction, null);

  return (
    <>
      <div className="w-full bg-white px-5 py-3">
        <form action={action} className="flex gap-2" ref={formRef}>
          <input name="tweetId" type="hidden" value={tweetId}/>
          <input name="userId" type="hidden" value={userId}/>
          <div>
            <input
              name="response"
              type="text"
              placeholder="답글 게시하기"
              required
              minLength={1}
              className="w-full bg-white py-2.5 px-5 outline-0 rounded-full border border-neutral-200"/>
            {
              state?.fieldErrors && <span>{state?.fieldErrors[0]}</span>
            }
          </div>
          <button
            className="w-24 text-center h-12 bg-neutral-100 rounded-full font-bold
             disabled:bg-neutral-300 disabled:text-neutral-500">
            답글
          </button>
        </form>
      </div>

      <div>
        {
          optimisticState.map((response) => (
            <div key={response.id} className="border-b border-neutral-200 py-3 px-5">
              <p>{response.user.username}</p>
              <p>{response.response}</p>
              <p>{formatDate(response.created_at)}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}