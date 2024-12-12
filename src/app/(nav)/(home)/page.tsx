import TweetList from "@/components/tweet-list";
import FormTweet from "@/components/form-tweet";
import {getInitialTweets} from "@/services/tweet-service";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";

export default async function Home() {
  const initialTweets = await getInitialTweets();
  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    notFound();
  }

  return (
    <div>
      <div className="w-full bg-white px-5 py-3 border-b border-neutral-200">
        <FormTweet currentTweet={null} />
      </div>
      <TweetList initialTweets={initialTweets} userId={userId}/>
    </div>
  );
}