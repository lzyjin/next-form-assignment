import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import ProfileInfo from "@/components/profile/profile-info";
import ProfileTabs from "@/components/profile/profile-tabs";
import {getUserProfile, getUserResponses} from "@/services/profile-service";
import {getLoggedInUsername} from "@/services/user-service";
import ResponseItem from "@/components/response/response-item";

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
              <ResponseItem key={response.id} response={response} userId={userId} />
            ))
          }
        </div>
      </div>
    </div>
  );
}