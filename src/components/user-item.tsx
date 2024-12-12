import Link from "next/link";
import {User} from "@/lib/types";

export default function UserItem({user}: {user: User}) {
  return (
    <Link href={`/users/${user.username}`} className="border-b border-neutral-200 px-5 py-3">
      <div className="">
        <p>{user.username}</p>
        { user.bio && <p className="whitespace-pre-wrap">{user.bio}</p> }
        {/*<p>{formatDate(user.created_at.toString())}</p>*/}
      </div>
    </Link>
  );
}