import {EnvelopeIcon, UserIcon, KeyIcon} from "@heroicons/react/20/solid";
import {InputHTMLAttributes} from "react";
import {InputProps} from "@/lib/types";

export default function Input({name, errors = [], ...rest}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div
        className={`border border-neutral-200 rounded-full relative w-full overflow-hidden
          transition-shadow ring-offset-2 has-[:focus]:ring-2 has-[:focus]:ring-neutral-300
          ${errors?.length && "border-red-600 has-[:focus]:ring-red-600"}
      `}>
        {name === "email" && <EnvelopeIcon className="input-icon"/>}
        {name === "username" && <UserIcon className="input-icon"/>}
        {(name === "password" || name === "confirmPassword") && <KeyIcon className="input-icon"/>}
        <input name={name} {...rest} className="w-full bg-white py-2.5 pl-12 pr-5 outline-0" />
      </div>
      {
        errors.map(e => (
          <p key={e} className="text-red-600 my-1 text-sm">{e}</p>
        ))
      }
    </div>
  );
}