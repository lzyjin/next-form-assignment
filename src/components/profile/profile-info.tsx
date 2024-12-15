import {formatDate} from "@/lib/utils";
import {ProfileInfoProps} from "@/lib/types";
import {CalendarDaysIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function ProfileInfo({username, bio, createdAt, isLoggedInUsersProfile}: ProfileInfoProps) {
  return (
    <div className="w-full flex justify-between items-top p-5">
      <div>
        <p className="text-xl font-extrabold text-black dark:text-[#e7e9ea] mb-2">{username}</p>
        <p className="text-black dark:text-[#e7e9ea] mb-2">{bio}</p>
        <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-[#71767b]">
          <CalendarDaysIcon className="size-5"/>
          <span>가입일: {formatDate(createdAt.toString())}</span>
        </div>
      </div>
      {
        isLoggedInUsersProfile &&
        <Link
          href={`/users/${username}/edit`}
          className="text-sm text-neutral-600 dark:text-[#71767b]"
        >

          <span>정보 수정</span>
        </Link>
      }
    </div>
  );
}