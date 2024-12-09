import {db} from "@/lib/db";
import {TWEET_PAGE} from "@/lib/constants";
import TweetList from "@/components/tweet-list";
import {Prisma} from "@prisma/client";
import AddTweet from "@/components/add-tweet";

async function getInitialTweets() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const tweets = db.tweet.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: TWEET_PAGE,
    include: {
      user: true,
      responses: true,
      likes: true,
    },
  });

  return tweets;
}

async function totalTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
    },
  });

  return tweets.length;
}

export type initialTweetsType = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  const totalCount = await totalTweets();

  return (
    <div>
      <AddTweet />
      <TweetList initialTweets={initialTweets} totalCount={totalCount} />
    </div>
  );
}