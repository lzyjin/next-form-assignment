import {db} from "@/lib/db";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import TweetResponseList from "@/components/tweet-response-list";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import LikeButton from "@/components/like-button";
import {unstable_cache as nextCache} from "next/cache";
import {getSession} from "@/lib/session";
import {getResponses} from "@/app/(nav)/tweets/[id]/actions";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      responses: true,
    },
  });

  return tweet;
}

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
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

function getCachedLikeStatus(tweetId: number, numberId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });

  return cachedOperation(tweetId, numberId);
}

async function getCachedResponses(tweetId: number) {
  const cachedResponses = nextCache(getResponses, ["tweet-responses"], {
    tags: [`responses-${tweetId}`]
  });

  return cachedResponses(tweetId);
}

async function getUsername(userId: number) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    }
  });

  if (user) {
    return user.username;
  } else {
    return  null;
  }
}

export default async function TweetDetail({params}: { params: {id: string}}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const tweet = await getCachedTweet(id);

  if (!tweet) {
    notFound();
  }

  const session = await getSession();
  const userId = session.id!;
  const username = await getUsername(userId);

  const {likeCount, isLiked} = await getCachedLikeStatus(id, userId);

  const responses = await getCachedResponses(id);
  console.log(responses)

  return (
    <div>
      <div className="p-5 border-b border-neutral-200">
        <Link href="/">&larr;</Link>
      </div>

      <div className="p-5">
        <p>{tweet!.user.username}</p>
        <p>{tweet!.tweet}</p>
        <p>{formatDate(tweet!.created_at)}</p>
      </div>

      <div className="flex items-center gap-5 py-3 px-5 border-t border-b border-neutral-200">
        <div className="flex items-center gap-1">
          <ChatBubbleBottomCenterTextIcon className="w-5" />
          <span>{tweet?.responses.length}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id}/>
      </div>

      <div className="">
        <TweetResponseList tweetId={id} userId={userId} username={username ?? ""} responses={responses} />
      </div>
    </div>
  );
}