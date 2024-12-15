import {notFound} from "next/navigation";
import {getSession} from "@/lib/session";
import ProfileInfo from "@/components/profile/profile-info";
import {getUserTweets, getUserProfile} from "@/services/profile-service";
import ProfileTabs from "@/components/profile/profile-tabs";
import {getLoggedInUsername} from "@/services/user-service";
import TweetItem from "@/components/tweet/tweet-item";

export default async function Profile({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = decodeURIComponent(params.username);
  const isLoggedInUsersProfile = (await getLoggedInUsername(userId)) === username;

  if (!userId) {
    notFound();
  }
  const user = await getUserProfile(username);
  const tweets = await getUserTweets(userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="w-full">
      <ProfileInfo
        username={user.username}
        bio={user.bio ?? ""}
        createdAt={user.created_at}
        isLoggedInUsersProfile={isLoggedInUsersProfile}
      />
      <div>
        <ProfileTabs
          username={user.username}
          isLoggedInUsersProfile={isLoggedInUsersProfile}
        />
        <div>
          {
            tweets.map((tweet) => (
              <TweetItem key={tweet.id} tweet={tweet} userId={userId} />
            ))
          }
        </div>
      </div>
    </div>
  );
}