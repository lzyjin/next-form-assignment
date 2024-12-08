"use server";

import {TWEET_PAGE} from "@/lib/constants";
import {db} from "@/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = db.tweet.findMany({
    orderBy: {
      created_at: "desc",
    },
    skip: TWEET_PAGE * page,
    take: TWEET_PAGE,
    include: {
      user: true,
      responses: true,
      likes: true,
    },
  });

  return tweets;
}