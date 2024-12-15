"use client";

import Link from "next/link";
import {HomeIcon} from "@heroicons/react/24/solid";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {EllipsisHorizontalIcon, PencilIcon, SunIcon, TrashIcon} from "@heroicons/react/24/outline";
import {HomeIcon as HomeIconOutline, MagnifyingGlassIcon, MoonIcon, UserIcon as UserIconOutline} from "@heroicons/react/24/outline";
import {usePathname} from "next/navigation";
import {UserIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {logOut} from "@/services/user-service";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(p => !p);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed shrink-0 border-l border-r border-neutral-200 dark:border-[#3c4043] w-20 h-screen
    flex flex-col justify-between items-center z-20 py-2
    ">
      <div>
        <ul className="flex flex-col justify-center items-center gap-2 text-black dark:text-white">
          <li>
            <Link href="/" className="block p-3 *:w-7 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
              {
                pathname === "/" ?
                <HomeIcon /> :
                <HomeIconOutline />
              }
            </Link>
          </li>
          <li>
            <Link href="/search" className="block p-3 *:w-7 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <MagnifyingGlassIcon className={`${ pathname.includes("/search") && "stroke-[3px]" }`}/>
            </Link>
          </li>
          <li>
            <Link href={`/users/${loggedInUsername}`} className="block p-3 *:w-7 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
              {
                pathname === `/users/${loggedInUsername}` ?
                <UserIcon /> :
                <UserIconOutline />
              }
            </Link>
          </li>
          <li>
            <button onClick={toggleTheme} className="block p-3 *:w-7 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
              {
                isDark ?
                <SunIcon /> :
                <MoonIcon />
              }
            </button>
          </li>
        </ul>
      </div>
      {
        isMenuOpen && <div onClick={closeMenu} className="fixed left-0 top-0 w-screen h-screen z-10"/>
      }
      <div className="relative">
        <button className="block p-3 *:w-7 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={toggleMenu}>
          <UserCircleIcon className="text-black dark:text-neutral-400"/>
        </button>
        {
          isMenuOpen &&
          <div className="absolute left-0 -top-12 bg-white shadow-lg rounded-xl w-48 overflow-hidden z-20
            dark:text-black
          ">
            <form action={logOut} className="*:flex *:items-center *:gap-3 *:py-2 *:px-4 *:font-bold *:cursor-pointer">
              <button className="w-full h-full hover:bg-neutral-50">
                <span>로그아웃</span>
              </button>
            </form>
          </div>
        }
      </div>
    </div>
  );
}