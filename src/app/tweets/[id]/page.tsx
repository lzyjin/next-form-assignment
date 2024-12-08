import {db} from "@/lib/db";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import TweetResponseList from "@/components/tweet-response-list";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import LikeButton from "@/components/like-button";
import {unstable_cache as nextCache} from "next/cache";
import {getSession} from "@/lib/session";

async function getTweet(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

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

function getCachedLikeStatus(postId: number, numberId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${postId}`],
  });

  return cachedOperation(postId, numberId);
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

  const {likeCount, isLiked} = await getCachedLikeStatus(id, userId);

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
        <TweetResponseList tweetId={id} userId={userId} responses={tweet?.responses} />
      </div>
    </div>
  );
}