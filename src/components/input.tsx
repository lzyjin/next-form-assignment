"use client";

import {EnvelopeIcon, UserIcon, KeyIcon} from "@heroicons/react/20/solid";
import {InputHTMLAttributes} from "react";
import {InputProps} from "@/lib/types";
import {usePathname} from "next/navigation";

export default function Input({name, errors = [], ...rest}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const pathname = usePathname();

  return (
    <div className="w-full flex-grow">
      <div
        className={`border border-neutral-200 rounded-full relative w-full overflow-hidden
          transition-shadow ring-offset-2 has-[:focus]:ring-2 has-[:focus]:ring-neutral-300
          ${errors?.length && "border-red-600 has-[:focus]:ring-red-600"}
      `}>
        {
          (pathname === "/log-in" || pathname === "/create-account") &&
          name === "email" &&
          <EnvelopeIcon className="input-icon"/>
        }
        {
          (pathname === "/log-in" || pathname === "/create-account") &&
          name === "username" &&
          <UserIcon className="input-icon"/>
        }
        {
          (pathname === "/log-in" || pathname === "/create-account") &&
          (name === "password" || name === "confirmPassword") &&
          <KeyIcon className="input-icon"/>
        }
        <input
          id={name}
          name={name}
          {...rest}
          className={`
            w-full bg-transparent py-2.5 px-5 pr-5 outline-0 read-only:bg-neutral-100 text-black
            dark:read-only:bg-neutral-700 dark:text-white
            ${(pathname === "/log-in" || pathname === "/create-account") && "pl-12" }
          `} />
      </div>
      {
        errors.map(e => (
          <p key={e} className="text-red-600 my-1 text-sm">{e}</p>
        ))
      }
    </div>
  );
}