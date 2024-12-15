"use client";

import Link from "next/link";
import {ProfileTabsProps} from "@/lib/types";
import {usePathname} from "next/navigation";

export default function ProfileTabs({username, isLoggedInUsersProfile}: ProfileTabsProps) {
  const pathname = decodeURIComponent(usePathname());

  return (
    <div className="flex items-center border-b border-neutral-200 text-center
      *:flex-auto *:block *:px-5 *:pt-3 text-neutral-400 dark:text-[#71767b]
    ">
      <Link href={`/users/${username}`} className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
        <div className="relative pb-3">
          <p className={`${pathname === `/users/${username}` && "font-bold text-black dark:text-[#e7e9ea]"}`}>게시물</p>
          { pathname === `/users/${username}` && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-amber-300"/>}
        </div>
      </Link>

      <Link href={`/users/${username}/responses`} className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
        <div className="relative pb-3">
          <p className={`${pathname === `/users/${username}/responses` && "font-bold text-black dark:text-[#e7e9ea]"}`}>답글</p>
          { pathname === `/users/${username}/responses` && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-amber-300"/>}
        </div>
      </Link>
      {
        isLoggedInUsersProfile && (
        <Link href={`/users/${username}/likes`} className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <div className="relative pb-3">
            <p className={`${pathname === `/users/${username}/likes` && "font-bold text-black dark:text-[#e7e9ea]"}`}>마음에 들어요</p>
            { pathname === `/users/${username}/likes` && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-amber-300"/>}
          </div>
        </Link>
        )
      }
    </div>
  );
}