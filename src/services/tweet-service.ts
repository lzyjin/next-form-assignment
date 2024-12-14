"use server";

import {db} from "@/lib/db";
import {TWEET_PAGE} from "@/lib/constants";
import {Prisma} from "@prisma/client";
import {getSession} from "@/lib/session";
import {revalidateTag} from "next/cache";
import {addTweetSchema, editTweetSchema, tweetResponseSchema} from "@/lib/schemas";
import {redirect} from "next/navigation";

export async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: TWEET_PAGE,
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

export type initialTweetsType = Prisma.PromiseReturnType<typeof getInitialTweets>;

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    orderBy: {
      created_at: "desc",
    },
    skip: TWEET_PAGE * page,
    take: TWEET_PAGE,
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

export async function totalTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
    },
  });

  return tweets.length;
}

export async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
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

  return tweet;
}

export async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export async function likeTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });

    revalidateTag(`like-status-${tweetId}`);

  } catch (e) {
    console.log(e);
  }
}

export async function dislikeTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });

    revalidateTag(`like-status-${tweetId}`);

  } catch (e) {
    console.log(e);
  }
}

export async function getResponses(tweetId: number) {
  const responses = await db.response.findMany({
    where: {
      tweetId,
    },
    select: {
      id: true,
      response: true,
      tweetId: true,
      userId: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      }
    }
  })

  return responses;
};

export const addTweetResponse = async (formData: FormData) => {
  const response= formData.get("response");
  const tweetId = formData.get("tweetId");
  const userId = formData.get("userId");

  const result = tweetResponseSchema.safeParse(response);

  if (!result.success) {
    return result.error.flatten();

  } else {
    try {
      await db.response.create({
        data: {
          response: result.data,
          tweetId: Number(tweetId),
          userId: Number(userId),
        },
        select: {
          id: true,
        },
      });

      revalidateTag(`responses-${tweetId}`);
    } catch (e) {
      console.log(e);
    }
  }
}

export async function postTweet(prevState: unknown, formData: FormData) {
  const data = {
    content: formData.get("content"),
  };

  const result = addTweetSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();

  } else {
    const session = await getSession();
    const userId = session.id!;

    const newTweet = await db.tweet.create({
      data: {
        tweet: result.data.content,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    // revalidatePath(`/`);
    redirect(`/tweets/${newTweet.id}`);
  }
}

export async function editTweet(prevState: unknown, formData: FormData) {
  const data = {
    content: formData.get("content"),
    tweetId: Number(formData.get("tweetId")),
  };

  const result = editTweetSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();

  } else {
    const session = await getSession();
    const userId = session.id!;

    const newTweet = await db.tweet.update({
      where: {
        id: result.data.tweetId,
      },
      data: {
        tweet: result.data.content,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    revalidateTag(`tweet-detail-${result.data.tweetId}`);
    redirect(`/tweets/${newTweet.id}`);
  }
}

export async function deleteTweet(tweetId: number) {
  const tweet = await db.tweet.delete({
    where: {
      id: tweetId,
    },
    select: {
      id: true,
    },
  });

  return tweet;
}

export async function deleteResponse(responseId: number) {
  const response = await db.response.delete({
    where: {
      id: responseId,
    },
    select: {
      id: true,
    },
  });

  return response;
}