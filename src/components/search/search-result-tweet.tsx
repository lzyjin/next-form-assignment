"use client";

import {SearchTweetResultProps, Tweet} from "@/lib/types";
import {moreSearchTweets, searchTweets} from "@/services/search-service";
import TweetItem from "@/components/tweet/tweet-item";
import {useEffect, useRef, useState} from "react";

export default function SearchResultTweet({query, userId}: SearchTweetResultProps) {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function setInitialTweets() {
      const initialTweets = await searchTweets(query);
      setTweets(initialTweets);
    }

    setInitialTweets();
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries, observer) => {
        const element = entries[0];

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newTweets = await moreSearchTweets(query, page + 1);

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
      { tweets.length === 0 && <p className="text-center mt-10">검색 결과가 없습니다.</p> }
      {
        tweets?.map(tweet => (
          <TweetItem key={tweet.id} tweet={tweet} userId={userId} searchKeyword={query} />
        ))
      }
      {
        !isLastPage ?
        <span ref={trigger} className="opacity-0">{ isLoading ? "Loading..." : "Load more" }</span> :
        null
      }
    </div>
  );
}