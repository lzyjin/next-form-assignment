import {formatDate} from "@/lib/utils";
import {
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconOutline, PencilIcon, TrashIcon
} from "@heroicons/react/24/outline";
import {HeartIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {Tweet} from "@/lib/types";
import {useEffect, useState} from "react";
import DeleteModal from "@/components/delete-modal";

export default function TweetItem({tweet, userId}: {tweet: Tweet, userId: number}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    tweet.likes.map(like => {
      if (like.userId === userId) {
        setIsLiked(true);
      }
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(p => !p);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openDeleteModal = () => {
    closeMenu();
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="relative">

      <Link href={`/tweets/${tweet.id}`} className="block border-b border-neutral-200 px-5 py-3 hover:bg-neutral-50">
        <p>{tweet.user.username}</p>
        <p className="line-clamp-10 whitespace-pre-wrap">{tweet.tweet}</p>
        <p>{formatDate(tweet.created_at.toString())}</p>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <ChatBubbleBottomCenterTextIcon className="w-5"/>
            <span>{tweet?.responses.length}</span>
          </div>
          <div className="flex items-center gap-1">
            {
              isLiked ?
              <HeartIcon className="w-5 text-amber-300"/> :
              <HeartIconOutline className="w-5"/>
            }
            <span className={`${isLiked ? "text-amber-300" : ""}`}>{tweet?.likes.length}</span>
          </div>
        </div>
      </Link>

      { isMenuOpen && <div onClick={closeMenu} className="fixed left-0 top-0 w-screen h-screen z-10" /> }

      {
        tweet.userId === userId && (
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
                  <TrashIcon className="size-4"/>
                  <span>삭제하기</span>
                </div>
                <div className="hover:bg-neutral-50">
                  <PencilIcon className="size-4"/>
                  <span>수정</span>
                </div>
              </div>
            }
          </div>
        )
      }
      {
        isDeleteModalOpen && <DeleteModal tweetId={tweet.id} />
      }
    </div>
  );
}