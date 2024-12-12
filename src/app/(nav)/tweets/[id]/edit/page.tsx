import GoBackButton from "@/components/go-back-button";
import {formatDate} from "@/lib/utils";
import {notFound} from "next/navigation";
import {unstable_cache as nextCache} from "next/dist/server/web/spec-extension/unstable-cache";
import {getTweet} from "@/services/tweet-service";
import FormTweet from "@/components/form-tweet";

const getCachedTweet = nextCache(getTweet, ["tweet-edit"], {
  tags: ["tweet-edit"],
  revalidate: 60,
});

export default async function TweetEdit({params}: { params: {id: string}}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const tweet = await getCachedTweet(id);

  if (!tweet) {
    notFound();
  }

  return (
    <div>
      <div className="p-5 border-b border-neutral-200">
        <GoBackButton/>
      </div>

      <div className="px-5 py-3 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-3">
          <p className="font-bold text-black">{tweet.user.username}</p>
          <p className="text-sm text-neutral-600">{formatDate(tweet.created_at.toString())}</p>
        </div>

        <FormTweet currentTweet={tweet}/>
      </div>
    </div>
  );
}