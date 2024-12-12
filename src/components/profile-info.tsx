import {formatDate} from "@/lib/utils";
import {ProfileInfoProps} from "@/lib/types";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {logOut} from "@/services/user-service";
import {getSession} from "@/lib/session";

export default async function ProfileInfo({username, bio, createdAt, isLoggedInUsersProfile}: ProfileInfoProps) {
  const session = await getSession();
  const userId = session.id!;

  return (
    <div className="w-full flex justify-between items-top">
      <div>
        <p>{username}</p>
        <p>{bio}</p>
        <div className="flex items-center gap-1">
          <CalendarDaysIcon className="size-5"/>
          <span>가입일: {formatDate(createdAt.toString())}</span>
        </div>
      </div>
      {
        isLoggedInUsersProfile &&
        <>
          <Link href={`/users/${username}/edit`}>정보 수정</Link>
          <form action={logOut}>
            <button>로그아웃</button>
          </form>
        </>
      }
    </div>
  );
}