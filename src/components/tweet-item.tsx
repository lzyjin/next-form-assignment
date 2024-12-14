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

export default function TweetItem({tweet, userId, searchKeyword}: {tweet: Tweet, userId: number, searchKeyword?: string}) {
  const [isLiked, setIsLiked] = useState(false);
  const [searchResultContent, setSearchResultContent] = useState<string[]>([]);

  useEffect(() => {
    setSearchResultContent([]);

    tweet.likes.map(like => {
      if (like.userId === userId) {
        setIsLiked(true);
      }
    });
  }, [tweet.likes, userId]);

  useEffect(() => {
    setSearchResultContent([]);

    if (searchKeyword) {
      const keywordIndex = tweet.tweet.indexOf(searchKeyword);
      const tweetContentArr = tweet.tweet.split("");
      const frontArr = tweetContentArr.slice(0, keywordIndex);
      const backArr = tweetContentArr.slice(keywordIndex + searchKeyword.length);

      setSearchResultContent([frontArr.join(""), searchKeyword, backArr.join("")])
    }
  }, [searchKeyword, tweet.tweet]);

  return (
    <div className="relative">

      <Link href={`/tweets/${tweet.id}`} className="block border-b border-neutral-200 px-5 py-3
      hover:bg-neutral-50 dark:border-[#3c4043] dark:hover:bg-neutral-800">
        <div className="flex items-center gap-2 mb-3">
          <p className="font-bold text-black dark:text-[#e7e9ea]">{tweet.user.username}</p>
          <p className="text-sm text-neutral-600 dark:text-[#71767b]">{formatDate(tweet.created_at.toString())}</p>
        </div>
        <p className="line-clamp-10 whitespace-pre-wrap mb-3 dark:text-[#e7e9ea]">
          {
            searchResultContent.length ?
            searchResultContent.map((t, i) => (
              <span key={i} className={`${i === 1 ? "font-bold bg-amber-200 dark:bg-transparent dark:text-amber-200" : ""}`}>{t}</span>
            )) :
            tweet.tweet
          }
        </p>
        <div className="flex items-center gap-5 dark:text-[#71767b]">
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