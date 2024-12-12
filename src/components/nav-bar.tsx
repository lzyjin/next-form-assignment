"use client";

import Link from "next/link";
import {HomeIcon} from "@heroicons/react/24/solid";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {SunIcon} from "@heroicons/react/24/outline";
import {HomeIcon as HomeIconOutline, MagnifyingGlassIcon, MoonIcon, HeartIcon, UserIcon as UserIconOutline} from "@heroicons/react/24/outline";
import {usePathname} from "next/navigation";
import {UserIcon} from "@heroicons/react/24/solid";

export default function NavBar({loggedInUsername}: {loggedInUsername: string}) {
  const pathname = decodeURIComponent(usePathname());

  return (
    <div className="fixed shrink-0 border-l border-r border-neutral-200 w-20 h-screen bg-white
    flex flex-col justify-between items-center
    py-5
    ">
      <div>
        <ul className="flex flex-col justify-center items-center gap-7">
          <li>
            <Link href="/">
              {
                pathname === "/" ?
                <HomeIcon className="text-neutral-400 w-7"/> :
                <HomeIconOutline className="text-neutral-400 w-7"/>
              }
            </Link>
          </li>
          <li>
            <Link href="/search">
              <MagnifyingGlassIcon className={`text-neutral-400 w-7 ${ pathname.includes("/search") && "stroke-[3px]" }`}/>
            </Link>
          </li>
          <li>
            <Link href="">
              {
                <HeartIcon className="text-neutral-400 w-7"/>
              }
            </Link>
          </li>
          <li>
            <Link href={`/users/${loggedInUsername}`}>
              {
                pathname === `/users/${loggedInUsername}` ?
                <UserIcon className="text-neutral-400 w-7" /> :
                <UserIconOutline className="text-neutral-400 w-7" />
              }
            </Link>
          </li>
          <li>
            <button>
              <MoonIcon className="text-neutral-400 w-7"/>
              {/*<SunIcon className="text-neutral-400 w-8" />*/}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <Link href={``} className={``}>
          <UserCircleIcon className="text-neutral-400 w-7"/>
        </Link>
      </div>
    </div>
  );
}