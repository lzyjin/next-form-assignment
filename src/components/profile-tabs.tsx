"use client";

import Link from "next/link";
import {ProfileTabsProps} from "@/lib/types";
import {usePathname} from "next/navigation";

export default function ProfileTabs({username, isLoggedInUsersProfile}: ProfileTabsProps) {
  const pathname = decodeURIComponent(usePathname());

  return (
    <div className="flex gap-5 border-b border-neutral-200 *:py-2 *:px-5 *:relative">
      <Link href={`/users/${username}`}>
        <span>게시물</span>
        { pathname === `/users/${username}` && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-yellow-500"/>}
      </Link>
      <Link href={`/users/${username}/responses`}>
        <span>답글</span>
        { pathname === `/users/${username}/responses` && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-yellow-500"/>}
      </Link>
      {
        isLoggedInUsersProfile && (
        <Link href={`/users/${username}/likes`}>
          <span>마음에 들어요</span>
          { pathname === `/users/${username}/likes` && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-yellow-500"/>}
        </Link>
        )
      }
    </div>
  );
}