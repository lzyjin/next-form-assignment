"use client";

import Link from "next/link";
import {HomeIcon} from "@heroicons/react/24/solid";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {SunIcon} from "@heroicons/react/24/outline";
import {HomeIcon as HomeIconOutline, MagnifyingGlassIcon, MoonIcon, HeartIcon, UserIcon as UserIconOutline} from "@heroicons/react/24/outline";
import {usePathname} from "next/navigation";
import {UserIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";

export default function NavBar({loggedInUsername}: {loggedInUsername: string}) {
  const pathname = decodeURIComponent(usePathname());
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleSystemThemeChange = ({matches}: any) => {
      if (matches) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener("change", handleSystemThemeChange);

    return () => {
      window.removeEventListener("change", handleSystemThemeChange);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(p => !p);
  };

  return (
    <div className="fixed shrink-0 border-l border-r border-neutral-200 dark:border-[#3c4043] w-20 h-screen
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
            <button onClick={toggleTheme}>
              {
                isDark ?
                <SunIcon className="text-neutral-400 w-8" /> :
                <MoonIcon className="text-neutral-400 w-7" />
              }
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