import {formatDate} from "@/lib/utils";
import {ProfileInfoProps} from "@/lib/types";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {logOut} from "@/services/user-service";

export default function ProfileInfo({username, bio, createdAt}: ProfileInfoProps) {
  return (
    <div className="w-full flex justify-between items-top">
      <div>
        <p>{username}</p>
        <p>{bio}</p>
        <div className="flex items-center gap-1">
          <CalendarDaysIcon className="size-5"/>
          <span>가입일: {formatDate(createdAt)}</span>
        </div>
      </div>
      <Link href={`/users/${username}/edit`}>정보 수정</Link>
      <form action={logOut}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}