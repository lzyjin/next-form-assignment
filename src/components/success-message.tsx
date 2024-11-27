import {CheckBadgeIcon} from "@heroicons/react/20/solid";

export default function SuccessMessage() {
  return (
    <div className="bg-emerald-500 text-black flex items-center gap-3 p-4 rounded-xl">
      <CheckBadgeIcon className="h-6 w-6"/>
      <span>Welcome back!</span>
    </div>
  );
}