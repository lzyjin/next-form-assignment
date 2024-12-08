"use client";

import {formatDate} from "@/lib/utils";
import {useOptimistic, useRef} from "react";
import {addTweetResponse} from "@/components/add-tweet-response-action";

interface TweetResponse {
  id: number;
  created_at: Date;
  updated_at: Date;
  userId: number;
  response: string;
  tweetId: number;
}

interface TweetResponseListProps {
  tweetId: number;
  userId: number;
  responses: TweetResponse[];
}

export default function TweetResponseList({tweetId, userId, responses}: TweetResponseListProps) {
  const ref = useRef<HTMLFormElement>(null);

  const [optimisticState, addOptimistic] = useOptimistic(
    responses,
    (currentState: TweetResponse[], optimisticValue: TweetResponse) => [
        ...currentState,
        optimisticValue
      ]
  );

  async function formAction(formData: FormData) {
    addOptimistic({
      created_at: new Date(),
      updated_at: new Date(),
      id: 0,
      tweetId,
      userId,
      response: formData.get("response"),
    } as TweetResponse);

    await addTweetResponse(formData);
  }

  return (
    <>
      <div className="w-full bg-white px-5 py-3">
        <form action={formAction} className="flex gap-2" ref={ref}>
          <input name="tweetId" type="hidden" value={tweetId}/>
          <input
            name="response"
            type="text"
            placeholder="답글 게시하기"
            required
            minLength={1}
            className="w-full bg-white py-2.5 px-5 outline-0 rounded-full border border-neutral-200"/>
          <button
            className="w-24 text-center h-12 bg-neutral-100 rounded-full font-bold disabled:bg-neutral-300 disabled:text-neutral-500">
            답글
          </button>
        </form>
      </div>

      <div>
        {
          optimisticState.map((response) => (
            <div key={response.id} className="border-b border-neutral-200 py-3 px-5">
              <p>{response.response}</p>
              <p>{formatDate(response.created_at)}</p>
            </div>
          ))
        }
      </div>
    </>
  );
}