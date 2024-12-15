import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import ResponseList from "@/components/response/response-list";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import LikeButton from "@/components/like-button";
import {unstable_cache as nextCache} from "next/cache";
import {getSession} from "@/lib/session";
import {getLikeStatus, getResponses, getTweet} from "@/services/tweet-service";
import {getLoggedInUsername} from "@/services/user-service";
import GoBackButton from "@/components/go-back-button";
import TweetMenuSection from "@/components/tweet/tweet-menu-section";

function getCachedTweet(id: number) {
  const cachedTweet = nextCache(getTweet, ["tweet-detail"], {
    tags: ["tweet-detail", `tweet-detail-${id}`],
    revalidate: 60,
  });

  return cachedTweet(id);
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
  const userId = session.id;

  if (!userId) {
    notFound();
  }

  const username = await getLoggedInUsername(userId);

  const {likeCount, isLiked} = await getCachedLikeStatus(id, userId);

  const responses = await getCachedResponses(id);

  return (
    <div>
      <div className="p-5 border-b border-neutral-200 dark:border-[#3c4043]">
        <GoBackButton />
      </div>

      <div className="relative p-5">
        <div className="flex items-center gap-2 mb-3">
          <p className="font-bold text-black dark:text-[#e7e9ea]">{tweet.user.username}</p>
          <p className="text-sm text-neutral-600 dark:text-[#71767b]">{formatDate(tweet.created_at.toString())}</p>
        </div>
        <p className="whitespace-pre-wrap dark:text-[#e7e9ea]">{tweet.tweet}</p>

        <TweetMenuSection userId={userId} tweetUserId={tweet.userId} tweetId={tweet.id}/>
      </div>

      <div className="flex items-center gap-5 py-3 px-5 border-t border-b border-neutral-200 dark:border-[#3c4043]">
        <div className="flex items-center gap-1 dark:text-[#71767b]">
          <ChatBubbleBottomCenterTextIcon className="w-5" />
          <span>{tweet?.responses.length}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id}/>
      </div>

      <div className="">
        <ResponseList tweetId={id} userId={userId} username={username ?? ""} responses={responses} />
      </div>
    </div>
  );
}