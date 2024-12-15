"use client";

import DeleteModal from "@/components/delete-modal";
import {useState} from "react";
import ResponseMenu from "@/components/response/response-menu";

export default function ResponseMenuSection(
  {userId, responseUserId, responseId}:
  {userId: number, responseUserId: number, responseId: number}
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

      { responseUserId === userId && <ResponseMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} openDeleteModal={openDeleteModal} responseId={responseId} /> }

      { isDeleteModalOpen && <DeleteModal targetId={responseId} targetType="response" /> }
    </>
  )
}