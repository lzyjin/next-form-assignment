import {formatDate} from "@/lib/utils";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import {db} from "@/lib/db";
import ProfileInfo from "@/components/profile-info";
import ProfileTabs from "@/components/profile-tabs";

async function getUser(userId: number) {
  const user = db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      tweets: {
        orderBy: {
          created_at: 'desc',
        },
      }
    }
  });

  return user;
}

async function getLikes(userId: number) {
  const likes = db.like.findMany({
    where: {
      userId,
    },
    select: {
      userId: true,
      tweetId: true,
      tweet: {
        select: {
          tweet: true,
          created_at: true,
          user: {
            select: {
              id: true,
              username: true,
            }
          },
        }
      }
    }
  });

  return likes;
}

export default async function UserLikes({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = params.username;
  const user = await getUser(userId);
  const likes = await getLikes(userId);
  console.log(likes)

  if (!user) {
    notFound();
  }

  return (
    <div>
      <ProfileInfo username={username} createdAt={user.created_at} />
      <div>
        <ProfileTabs username={username} />
        <div>
          {
            likes.map((like) => (
              <div key={like.userId + like.tweetId} className="">
                <p>
                  <strong>{like.tweet.user.username}</strong>
                  <span>{formatDate(like.tweet.created_at)}</span>
                </p>
                <p>{like.tweet.tweet}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}