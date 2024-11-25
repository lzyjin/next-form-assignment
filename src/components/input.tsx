import {EnvelopeIcon, UserIcon, KeyIcon} from "@heroicons/react/20/solid";

interface InputProps {
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
  error?: string;
}

export default function Input({name, type, required, placeholder, error}: InputProps) {
  return (
    <div>
      <div
        className={`border border-neutral-200 rounded-full relative w-full overflow-hidden
          transition-shadow ring-offset-2 has-[:focus]:ring-2 has-[:focus]:ring-neutral-300
          ${error && "border-red-600 has-[:focus]:ring-red-600"}
      `}>
        {name === "email" && <EnvelopeIcon className="input-icon"/>}
        {name === "username" && <UserIcon className="input-icon"/>}
        {name === "password" && <KeyIcon className="input-icon"/>}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full bg-white py-2.5 pl-12 pr-5 outline-0"
        />
      </div>
      {error && <p className="text-red-600 my-1 text-sm">{error}</p>}
    </div>
  );
}