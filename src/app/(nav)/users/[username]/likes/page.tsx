import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ProfileInfo from "@/components/profile/profile-info";
import ProfileTabs from "@/components/profile/profile-tabs";
import {getUserLikes, getUserProfile} from "@/services/profile-service";
import {getLoggedInUsername} from "@/services/user-service";
import TweetItem from "@/components/tweet/tweet-item";

export default async function UserLikes({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = decodeURIComponent(params.username);
  const isLoggedInUsersProfile = (await getLoggedInUsername(userId)) === username;

  if (!userId) {
    notFound();
  }

  const user = await getUserProfile(username);
  const likes = await getUserLikes(userId);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <ProfileInfo
        username={username}
        createdAt={user.created_at}
        bio={user.bio ?? ""}
        isLoggedInUsersProfile={isLoggedInUsersProfile}
      />
      <div>
        <ProfileTabs
          username={user.username}
          isLoggedInUsersProfile={isLoggedInUsersProfile}
        />
        <div>
          {
            likes.map((like) => (
              <TweetItem key={like.userId + like.tweetId} tweet={like.tweet} userId={like.userId} />
            ))
          }
        </div>
      </div>
    </div>
  );
}