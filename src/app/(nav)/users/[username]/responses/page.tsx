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

async function getResponses(userId: number) {
  const responses = db.response.findMany({
    where: {
      userId,
    },
  });

  return responses;
}

export default async function UserResponses({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id!;
  const username = params.username;
  const user = await getUser(userId);
  const responses = await getResponses(userId);

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
            responses.map((response) => (
              <div key={response.id} className="">
                <p>
                  <strong>{username}</strong>
                  <span>{formatDate(response.created_at)}</span>
                </p>
                <p>{response.response}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}