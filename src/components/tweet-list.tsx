"use client";

import Link from "next/link";
import {formatDate} from "@/lib/utils";
import {useState} from "react";
import {getMoreTweets} from "@/app/(nav)/(home)/actions";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import {HeartIcon as HeartIconOutline} from "@heroicons/react/24/outline";
import {TweetListProps} from "@/lib/types";

export default function TweetList({initialTweets}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleMoreTweets = async () => {
    const newTweets = await getMoreTweets(page + 1);

    if (newTweets.length === 0) {
      setIsLastPage(true);

      return;

    }

    setTweets(prev => [...prev, ...newTweets]);

    setPage(prev => prev + 1);
  };

  return (
    <div>
      <div className="flex flex-col gap-7">
        {
          tweets?.map(tweet => (
            <Link href={`/tweets/${tweet.id}`} key={tweet.id} className="border-b border-neutral-200 px-5 py-3">
              <div className="">
                <p>{tweet.user.username}</p>
                <p>{tweet.tweet}</p>
                <p>{formatDate(tweet.created_at)}</p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    <ChatBubbleBottomCenterTextIcon className="w-5"/>
                    <span>{tweet?.responses.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartIconOutline className="w-5"/>
                    <span>{tweet?.likes.length}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      {
        isLastPage ?
          null :
          <button onClick={handleMoreTweets}>다음</button>
      }
    </div>
  );
}