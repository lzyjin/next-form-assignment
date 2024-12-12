"use client";

import {formatDate} from "@/lib/utils";
import {
  ChatBubbleBottomCenterTextIcon,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/outline";
import {HeartIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {Tweet} from "@/lib/types";
import {useEffect, useState} from "react";
import TweetMenuSection from "@/components/tweet-menu-section";

export default function TweetItem({tweet, userId}: {tweet: Tweet, userId: number}) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    tweet.likes.map(like => {
      if (like.userId === userId) {
        setIsLiked(true);
      }
    });
  }, []);

  return (
    <div className="relative">

      <Link href={`/tweets/${tweet.id}`} className="block border-b border-neutral-200 px-5 py-3 hover:bg-neutral-50">
        <div className="flex items-center gap-2 mb-3">
          <p className="font-bold text-black">{tweet.user.username}</p>
          <p className="text-sm text-neutral-600">{formatDate(tweet.created_at.toString())}</p>
        </div>
        <p className="line-clamp-10 whitespace-pre-wrap mb-3">{tweet.tweet}</p>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <ChatBubbleBottomCenterTextIcon className="w-5"/>
            <span>{tweet?.responses.length}</span>
          </div>
          <div className="flex items-center gap-1">
            {
              isLiked ?
                <HeartIcon className="w-5 text-amber-300"/> :
                <HeartIconOutline className="w-5"/>
            }
            <span className={`${isLiked ? "text-amber-300" : ""}`}>{tweet?.likes.length}</span>
          </div>
        </div>
      </Link>

      <TweetMenuSection userId={userId} tweetUserId={tweet.userId} tweetId={tweet.id}/>
    </div>
  );
}