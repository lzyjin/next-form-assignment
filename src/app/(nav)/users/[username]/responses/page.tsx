import {formatDate} from "@/lib/utils";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ProfileInfo from "@/components/profile-info";
import ProfileTabs from "@/components/profile-tabs";
import Link from "next/link";
import {getUserProfile, getUserResponses} from "@/services/profile-service";

export default async function UserResponses({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = decodeURIComponent(params.username);

  if (!userId) {
    notFound();
  }

  const user = await getUserProfile(userId);
  const responses = await getUserResponses(userId);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <ProfileInfo username={username} createdAt={user.created_at} bio={user.bio ?? ""} />
      <div>
        <ProfileTabs username={username}/>
        <div>
          {
            responses.map((response) => (
              <Link href={`/tweets/${response.tweetId}`} key={response.id} className="">
                <p>
                  <strong>{username}</strong>
                  <span>{formatDate(response.created_at)}</span>
                </p>
                <p>{response.response}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}