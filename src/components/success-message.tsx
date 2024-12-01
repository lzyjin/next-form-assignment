import {CheckBadgeIcon} from "@heroicons/react/20/solid";
import Link from "next/link";

interface SuccessMessageProps {
    text: string;
    link?: {
      url: string;
      name: string;
    };
}

export default function SuccessMessage({text, link}: SuccessMessageProps) {
  return (
    <div>
      <div className="bg-emerald-500 text-black flex items-center gap-3 p-4 rounded-xl">
        <CheckBadgeIcon className="h-6 w-6"/>
        <span>{text}</span>
      </div>
      {
        link && <Link href={link?.url} className="text-center mt-3 block">{link?.name}</Link>
      }
    </div>
  );
}