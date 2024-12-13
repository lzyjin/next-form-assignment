"use server";

import {db} from "@/lib/db";

export async function getUserProfile(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
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
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      userId: true,
      likes: {
        select: {
          created_at: true,
          userId: true,
        }
      },
      responses: {
        select: {
          id: true,
        }
      },
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return tweets;
}

export async function getUserResponses(userId: number) {
  const responses = await db.response.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return responses;
}

export async function getUserLikes(userId: number) {
  const likes = await db.like.findMany({
    where: {
      userId,
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      userId: true,
      tweetId: true,
      tweet: {
        select: {
          id: true,
          tweet: true,
          created_at: true,
          likes: true,
          responses: true,
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