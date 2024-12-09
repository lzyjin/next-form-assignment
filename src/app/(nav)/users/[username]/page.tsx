import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import {ChatBubbleBottomCenterTextIcon, HeartIcon as HeartIconOutline} from "@heroicons/react/24/outline";
import {getSession} from "@/lib/session";
import ProfileInfo from "@/components/profile-info";
import {getUserTweets, getUserProfile} from "@/services/profile-service";
import ProfileTabs from "@/components/profile-tabs";

export default async function Profile({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = decodeURIComponent(params.username);

  if (!userId) {
    notFound();
  }
  const user = await getUserProfile(userId);
  const tweets = await getUserTweets(userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="w-full">
      <ProfileInfo username={username} bio={user.bio ?? ""} createdAt={user.created_at} />
      <div>
        <ProfileTabs username={username} />
        <div>
          {
            tweets.map((tweet) => (
              <Link href={`/tweets/${tweet.id}`} key={tweet.id} className="">
                <p>
                  <strong>{username}</strong>
                  <span>{formatDate(tweet.created_at)}</span>
                </p>
                <p>{tweet.tweet}</p>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    <ChatBubbleBottomCenterTextIcon className="w-5"/>
                    <span>{tweet?.responses.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HeartIconOutline className="w-5"/>
                    <span>{tweet?.likes.length}</span>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}