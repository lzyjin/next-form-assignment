import {formatDate} from "@/lib/utils";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ProfileInfo from "@/components/profile-info";
import ProfileTabs from "@/components/profile-tabs";
import Link from "next/link";
import {getUserLikes, getUserProfile} from "@/services/profile-service";
import {getLoggedInUsername} from "@/services/user-service";

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
              <Link href={`/tweets/${like.tweetId}`} key={like.userId + like.tweetId} className="">
                <p>
                  <strong>{like.tweet.user.username}</strong>
                  <span>{formatDate(like.tweet.created_at.toString())}</span>
                </p>
                <p>{like.tweet.tweet}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}