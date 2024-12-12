import TweetList from "@/components/tweet-list";
import AddTweet from "@/components/add-tweet";
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
      <AddTweet />
      <TweetList initialTweets={initialTweets} userId={userId} />
    </div>
  );
}