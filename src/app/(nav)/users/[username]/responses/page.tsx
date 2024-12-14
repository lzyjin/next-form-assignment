import {formatDate} from "@/lib/utils";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ProfileInfo from "@/components/profile-info";
import ProfileTabs from "@/components/profile-tabs";
import Link from "next/link";
import {getUserProfile, getUserResponses} from "@/services/profile-service";
import {getLoggedInUsername} from "@/services/user-service";
import ResponseMenuSection from "@/components/response-menu-section";

export default async function UserResponses({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = decodeURIComponent(params.username);
  const isLoggedInUsersProfile = (await getLoggedInUsername(userId)) === username;

  if (!userId) {
    notFound();
  }

  const user = await getUserProfile(username);
  const responses = await getUserResponses(userId);

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
            responses.map((response) => (
              <div key={response.id} className="relative">
                <Link href={`/tweets/${response.tweetId}`}>
                  <div className="block border-b border-neutral-200 px-5 py-3 dark:border-[#3c4043]">
                    <div className="flex items-center gap-2 mb-3">
                      <p className="font-bold text-black dark:text-[#e7e9ea]">{username}</p>
                      <p className="text-sm text-neutral-600 dark:text-[#71767b]">{formatDate(response.created_at.toString())}</p>
                    </div>
                    <p className="line-clamp-10 whitespace-pre-wrap dark:text-[#e7e9ea]">{ response.response }</p>
                  </div>
                </Link>

                <ResponseMenuSection userId={userId} responseUserId={response.userId} responseId={response.id} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}