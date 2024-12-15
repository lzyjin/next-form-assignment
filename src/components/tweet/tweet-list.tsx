"use client";

import {useEffect, useRef, useState} from "react";
import {TweetListProps} from "@/lib/types";
import {getMoreTweets} from "@/services/tweet-service";
import TweetItem from "@/components/tweet/tweet-item";

export default function TweetList({initialTweets, userId}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries, observer) => {
        const element = entries[0];

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newTweets = await getMoreTweets(page + 1);

          if (newTweets.length !== 0) {
            setPage(prev => prev + 1);
            setTweets(prev => [...prev, ...newTweets]);
            setIsLoading(false);

          } else {
            setIsLastPage(true);
          }
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    }

  }, [page]);

  return (
    <div>
      <div className="flex flex-col">
        {
          tweets?.map(tweet => (
            <TweetItem key={tweet.id} tweet={tweet} userId={userId} />
          ))
        }
      </div>
      {
        !isLastPage ?
        <span ref={trigger} className="opacity-0">{ isLoading ? "Loading..." : "Load more" }</span>
        :
        null
      }
    </div>
  );
}