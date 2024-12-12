"use server";

import {db} from "@/lib/db";
import {TWEET_PAGE} from "@/lib/constants";

export async function searchTweets(query: string) {
  const tweets = db.tweet.findMany({
    where: {
      tweet: {
        contains: query,
      },
    },
    take: TWEET_PAGE,
    orderBy: {
      likes: {
        _count: "desc",
      }
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      userId: true,
      likes: {
        select: {
          userId: true,
          created_at: true,
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

export async function moreSearchTweets(query: string, page: number) {
  const tweets = db.tweet.findMany({
    where: {
      tweet: {
        contains: query,
      },
    },
    take: TWEET_PAGE,
    skip: TWEET_PAGE * page,
    orderBy: {
      likes: {
        _count: "desc",
      }
    },
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      userId: true,
      likes: {
        select: {
          userId: true,
          created_at: true,
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

export async function searchTweetsLatest(query: string) {
  const tweets = db.tweet.findMany({
    where: {
      tweet: {
        contains: query,
      },
    },
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
          userId: true,
          created_at: true,
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

export async function moreSearchTweetsLatest(query: string, page: number) {
  const tweets = db.tweet.findMany({
    where: {
      tweet: {
        contains: query,
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take: TWEET_PAGE,
    skip: TWEET_PAGE * page,
    select: {
      id: true,
      tweet: true,
      created_at: true,
      updated_at: true,
      userId: true,
      likes: {
        select: {
          userId: true,
          created_at: true,
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

export async function searchUsers(query: string) {
  const users = db.user.findMany({
    where: {
      username: {
        contains: query,
      },
    },
    take: TWEET_PAGE,
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      bio: true,
      username: true,
      created_at: true,
      email: true,
    }
  });

  return users;
}

export async function moreSearchUsers(query: string, page: number) {
  const users = db.user.findMany({
    where: {
      username: {
        contains: query,
      },
    },
    take: TWEET_PAGE,
    skip: TWEET_PAGE * page,
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      bio: true,
      username: true,
      created_at: true,
      email: true,
    }
  });

  return users;
}