"use client";

import {formatDate} from "@/lib/utils";
import {useOptimistic, useRef} from "react";
import {addTweetResponse} from "@/components/add-tweet-response-action";
import {useFormState} from "react-dom";
import {tweetResponseSchema} from "@/lib/schemas";
import {TweetResponseListProps} from "@/lib/types";

export default function TweetResponseList({tweetId, userId, username, responses}: TweetResponseListProps) {
  const ref = useRef<HTMLFormElement>(null);

  const [optimisticState, addOptimistic] = useOptimistic(
    responses,
    (currentState, optimisticValue: string) => [
        ...currentState,
      {
        created_at: new Date(),
        updated_at: new Date(),
        id: 0,
        tweetId,
        userId,
        response: optimisticValue,
        user: {
          username,
        }
      },
    ]
  );

  async function formAction(_: unknown, formData: FormData) {
    const response = formData.get("response");

    const result = tweetResponseSchema.safeParse(response);

    if (!result.success) {
      return result.error.flatten();

    } else {
      addOptimistic(result.data);

      await addTweetResponse(formData);
    }
  }

  const [state, action] = useFormState(formAction, null);

  return (
    <>
      <div className="w-full bg-white px-5 py-3">
        <form action={action} className="flex gap-2" ref={ref}>
          <input name="tweetId" type="hidden" value={tweetId}/>
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