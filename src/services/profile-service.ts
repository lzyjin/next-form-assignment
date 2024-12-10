"use server";

import {db} from "@/lib/db";

export async function getUserProfile(userId: number) {
  const user = await db.user.findUnique({
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

export async function getUserTweets(userId: number) {
  const tweets = await db.tweet.findMany({
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

export async function getUserResponses(userId: number) {
  const responses = await db.response.findMany({
    where: {
      userId,
    },
  });

  return responses;
}

export async function getUserLikes(userId: number) {
  const likes = await db.like.findMany({
    where: {
      userId,
    },
    select: {
      userId: true,
      tweetId: true,
      tweet: {
        select: {
          tweet: true,
          created_at: true,
          user: {
            select: {
              id: true,
              username: true,
            }
          },
        }
      }
    }
  });

  return likes;
}