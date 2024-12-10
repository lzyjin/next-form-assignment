"use client";

import { useFormStatus } from "react-dom";
import {ButtonProps} from "@/lib/types";

export default function Button({text}: ButtonProps) {
  const {pending} = useFormStatus();

  return (
    <button
      className="w-full text-center h-12 bg-pink-500 text-white rounded-full font-bold
      disabled:bg-neutral-300 disabled:text-neutral-500"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}