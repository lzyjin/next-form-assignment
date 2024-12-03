"use client";

import Link from "next/link";
import {formatDate} from "@/lib/utils";
import {useState} from "react";
import {getMoreTweets} from "@/app/(home)/actions";
import {initialTweetsType} from "@/app/(home)/page";

interface TweetListProps {
  initialTweets: initialTweetsType;
  totalCount: number;
}

export default function TweetList({initialTweets, totalCount}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const handleMoreTweets = async () => {
    const newTweets = await getMoreTweets(page + 1);
    console.log(newTweets);

    if (newTweets.length === 0) {
      setIsLastPage(true);
      return;
    }

    setTweets(prev => [...prev, ...newTweets]);
    setPage(prev => prev + 1);
  };

  console.log(totalCount);

  return (
    <div>
      <div className="flex flex-col gap-7">
        {
          tweets?.map(tweet => (
            <Link href={`/tweets/${tweet.id}`} key={tweet.id}>
              <div className="">
                <p>{tweet.tweet}</p>
                <p>{formatDate(tweet.created_at)}</p>
                <p>{tweet.user.username}</p>
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