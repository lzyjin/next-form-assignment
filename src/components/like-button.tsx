"use client";

import {HeartIcon as HeartIconOutline} from "@heroicons/react/24/outline";
import {HeartIcon} from "@heroicons/react/24/solid";
import { useOptimistic } from 'react';
import {LikeButtonProps} from "@/lib/types";
import {dislikeTweet, likeTweet} from "@/services/tweet-service";

export default function LikeButton({isLiked, likeCount, tweetId}: LikeButtonProps) {
  const [state, updateFn] = useOptimistic({isLiked, likeCount}, (previousState) => {
    return {
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1,
    };
  });

  const onClick = async () => {
    // 미리 보여줄 값
    updateFn(undefined);

    // 실제 mutation
    if (isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };

  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={onClick}>
      {
        state.isLiked ?
          <>
            <HeartIcon className="w-5 text-amber-300" />
            <span className="text-amber-300">{state.likeCount}</span>
          </> :
          <>
            <HeartIconOutline className="w-5" />
            <span>{state.likeCount}</span>
          </>
      }
    </div>
  );
}