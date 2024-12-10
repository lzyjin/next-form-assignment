import TweetList from "@/components/tweet-list";
import AddTweet from "@/components/add-tweet";
import {getInitialTweets, totalTweets} from "@/services/tweet-service";

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