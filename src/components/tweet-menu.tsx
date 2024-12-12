import {EllipsisHorizontalIcon, PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TweetMenu(
  {toggleMenu, isMenuOpen, openDeleteModal, tweetId}:
  {toggleMenu: () => void, isMenuOpen: boolean, openDeleteModal: () => void, tweetId:number}
) {
  return (
    <div className="absolute right-2 top-2">
      <button
        onClick={toggleMenu}
        className="text-neutral-700 size-8 rounded-full flex justify-center items-center hover:bg-amber-100">
        <EllipsisHorizontalIcon className="size-5 stroke-2"/>
      </button>
      {
        isMenuOpen &&
        <div className="absolute right-2 top-2 bg-white shadow-lg rounded-xl w-48 overflow-hidden z-20
          *:flex *:items-center *:gap-3 *:py-2 *:px-4 *:font-bold *:cursor-pointer
        ">
          <div className="hover:bg-neutral-50 text-[#f4212e]" onClick={openDeleteModal}>
            <TrashIcon className="size-4" />
            <span>삭제하기</span>
          </div>
          <Link href={`/tweets/${tweetId}/edit`} className="block hover:bg-neutral-50">
            <PencilIcon className="size-4" />
            <span>수정</span>
          </Link>
        </div>
      }
    </div>
  );
}