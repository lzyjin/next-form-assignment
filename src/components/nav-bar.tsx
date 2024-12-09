import Link from "next/link";
import {getSession} from "@/lib/session";
import {HomeIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import {MagnifyingGlassIcon, MoonIcon, SunIcon, HeartIcon} from "@heroicons/react/24/outline";

export default async function NavBar() {
  const session = await getSession();
  const userId = session.id;

  return (
    <div className="fixed shrink-0 border-l border-r border-neutral-200 w-20 h-screen bg-white
    flex flex-col justify-between items-center
    py-5
    ">
      <div>
        <ul className="flex flex-col justify-center items-center gap-7">
          <li>
            <Link href="/">
              <HomeIcon className="text-neutral-400 w-7"/>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <MagnifyingGlassIcon className="text-neutral-400 w-7"/>
            </Link>
          </li>
          <li>
            <Link href="">
              <HeartIcon className="text-neutral-400 w-7"/>
            </Link>
          </li>
          <li>
            <button>
              <MoonIcon className="text-neutral-400 w-7"/>
              {/*<SunIcon className="text-neutral-400 w-8" />*/}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <Link href={`/users/${userId}`}>
          <UserCircleIcon className="text-neutral-400 w-7"/>
        </Link>
      </div>
    </div>
  );
}