import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import TweetResponseList from "@/components/tweet-response-list";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import LikeButton from "@/components/like-button";
import {unstable_cache as nextCache} from "next/cache";
import {getSession} from "@/lib/session";
import {getLikeStatus, getResponses, getTweet} from "@/services/tweet-service";
import {getLoggedInUsername} from "@/services/user-service";
import GoBackButton from "@/components/go-back-button";

const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

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
  console.log(tweet);

  if (!tweet) {
    notFound();
  }

  const session = await getSession();
  const userId = session.id;
  console.log(userId);

  if (!userId) {
    notFound();
  }

  const username = await getLoggedInUsername(userId);

  const {likeCount, isLiked} = await getCachedLikeStatus(id, userId);

  const responses = await getCachedResponses(id);

  return (
    <div>
      <div className="p-5 border-b border-neutral-200">
        <GoBackButton />
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