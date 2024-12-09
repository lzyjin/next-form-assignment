"use server";

import {db} from "@/lib/db";

export async function getUser(userId: number) {
  const user = db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      tweets: {
        orderBy: {
          created_at: 'desc',
        },
      }
    }
  });

  return user;
}

export async function getTweets(userId: number) {
  const tweets = db.tweet.findMany({
    where: {
      userId,
    },
    include: {
      responses: true,
      likes: true,
    }
  });

  return tweets;
}