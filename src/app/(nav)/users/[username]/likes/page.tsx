import {formatDate} from "@/lib/utils";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ProfileInfo from "@/components/profile-info";
import ProfileTabs from "@/components/profile-tabs";
import Link from "next/link";
import {getUserLikes, getUserProfile} from "@/services/profile-service";
import {getLoggedInUsername} from "@/services/user-service";
import TweetItem from "@/components/tweet-item";
import {ChatBubbleBottomCenterTextIcon, HeartIcon as HeartIconOutline} from "@heroicons/react/24/outline";
import {HeartIcon} from "@heroicons/react/24/solid";
import TweetMenuSection from "@/components/tweet-menu-section";

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
              <div className="relative" key={like.userId + like.tweetId}>

                <Link href={`/tweets/${like.tweet.id}`} className="block border-b border-neutral-200 px-5 py-3
                    hover:bg-neutral-50 dark:border-[#3c4043] dark:hover:bg-neutral-800">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="font-bold text-black dark:text-[#e7e9ea]">{like.tweet.user.username}</p>
                    <p
                      className="text-sm text-neutral-600 dark:text-[#71767b]">{formatDate(like.tweet.created_at.toString())}</p>
                  </div>
                  <p className="line-clamp-10 whitespace-pre-wrap mb-3 dark:text-[#e7e9ea]">{like.tweet.tweet}</p>
                  <div className="flex items-center gap-5 dark:text-[#71767b]">
                    <div className="flex items-center gap-1">
                      <ChatBubbleBottomCenterTextIcon className="w-5"/>
                      <span>{like.tweet?.responses.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {
                        userId === like.tweet.user.id ?
                          <HeartIcon className="w-5 text-amber-300"/> :
                          <HeartIconOutline className="w-5"/>
                      }
                      <span className={`${userId === like.tweet.user.id ? "text-amber-300" : ""}`}>{like.tweet?.likes.length}</span>
                    </div>
                  </div>
                </Link>

                <TweetMenuSection userId={userId} tweetUserId={like.tweet.user.id} tweetId={like.tweet.id}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}