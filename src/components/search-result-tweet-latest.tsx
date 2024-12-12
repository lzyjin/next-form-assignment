"use client";

import {SearchTweetResultProps} from "@/lib/types";
import {moreSearchTweetsLatest} from "@/services/search-service";
import TweetItem from "@/components/tweet-item";
import {useEffect, useRef, useState} from "react";

export default function SearchResultTweetLatest({query, initialTweets, userId}: SearchTweetResultProps) {
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
          const newTweets = await moreSearchTweetsLatest(query, page + 1);

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

  const handleMoreTweets = async () => {
    const newTweets = [...await moreSearchTweetsLatest(query, page + 1)];

    if (newTweets.length === 0) {
      setIsLastPage(true);
      return;
    }

    setTweets(prev => [...prev, ...newTweets]);

    setPage(prev => prev + 1);
  };

  return (
    <div>
      {
        tweets?.map(tweet => (
          <TweetItem key={tweet.id} tweet={tweet} userId={userId} />
        ))
      }
      {
        !isLastPage ?
          <span ref={trigger} className="opacity-0">{ isLoading ? "Loading..." : "Load more" }</span>
          :
          null
      }
    </div>
  );
}