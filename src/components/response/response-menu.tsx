"use client";

import {EllipsisHorizontalIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ResponseMenu(
  {toggleMenu, isMenuOpen, openDeleteModal}:
  {toggleMenu: () => void, isMenuOpen: boolean, openDeleteModal: () => void, responseId?:number}
) {

  return (
    <div className="absolute right-2 top-2">
      <button
        onClick={toggleMenu}
        className="text-neutral-700 size-8 rounded-full flex justify-center items-center
        hover:bg-amber-100
        dark:text-[#71767b] dark:hover:bg-neutral-700 dark:hover:text-amber-300">
        <EllipsisHorizontalIcon className="size-5 stroke-2 "/>
      </button>
      {
        isMenuOpen &&
        <div className="absolute right-2 top-2 bg-white shadow-lg rounded-xl w-48 overflow-hidden z-20
          *:flex *:items-center *:gap-3 *:py-2 *:px-4 *:font-bold *:cursor-pointer
          dark:text-black
        ">
          <div onClick={openDeleteModal} className="hover:bg-neutral-50 text-[#f4212e]">
            <TrashIcon className="size-4" />
            <span>삭제하기</span>
          </div>
          <Link href={``} className="block hover:bg-neutral-50">
            <PencilIcon className="size-4" />
            <span>수정</span>
          </Link>
        </div>
      }
    </div>
  );
}