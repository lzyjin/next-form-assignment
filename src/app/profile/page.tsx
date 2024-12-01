import {getSession} from "@/lib/session";
import {db} from "@/lib/db";

async function getUser() {
  const session = await getSession();
  const id = session.id;

  if(id) {
    const user = db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return user;
  }
}

export default async function Profile() {
  const user = await getUser();

  return (
    <div>
      <p>{user?.username}</p>
    </div>
  );
}