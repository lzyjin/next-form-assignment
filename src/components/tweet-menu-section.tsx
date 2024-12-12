"use client";

import TweetMenu from "@/components/tweet-menu";
import DeleteModal from "@/components/delete-modal";
import {useState} from "react";

export default function TweetMenuSection(
  {userId, tweetUserId, tweetId}:
  {userId: number, tweetUserId: number, tweetId: number}
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    <>
      { isMenuOpen && <div onClick={closeMenu} className="fixed left-0 top-0 w-screen h-screen z-10" /> }

      { tweetUserId === userId && <TweetMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} openDeleteModal={openDeleteModal} tweetId={tweetId} /> }

      { isDeleteModalOpen && <DeleteModal tweetId={tweetId} /> }
    </>
  )
}