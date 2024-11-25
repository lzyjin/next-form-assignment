"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({text}: ButtonProps) {
  const {pending} = useFormStatus();

  return (
    <button
      className="w-full text-center h-12 bg-neutral-100 rounded-full font-bold disabled:bg-neutral-300 disabled:text-neutral-500"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}