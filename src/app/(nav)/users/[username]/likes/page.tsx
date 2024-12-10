import {formatDate} from "@/lib/utils";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ProfileInfo from "@/components/profile-info";
import ProfileTabs from "@/components/profile-tabs";
import Link from "next/link";
import {getUserLikes, getUserProfile} from "@/services/profile-service";

export default async function UserLikes({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = decodeURIComponent(params.username);

  if (!userId) {
    notFound();
  }

  const user = await getUserProfile(userId);
  const likes = await getUserLikes(userId);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <ProfileInfo username={username} createdAt={user.created_at}  bio={user.bio ?? ""}/>
      <div>
        <ProfileTabs username={username} />
        <div>
          {
            likes.map((like) => (
              <Link href={`/tweets/${like.tweetId}`} key={like.userId + like.tweetId} className="">
                <p>
                  <strong>{like.tweet.user.username}</strong>
                  <span>{formatDate(like.tweet.created_at)}</span>
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