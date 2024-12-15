"use client";

import {formatDate} from "@/lib/utils";
import ResponseMenuSection from "@/components/response/response-menu-section";
import {TweetResponse} from "@/lib/types";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";

export default function ResponseItem({response, userId}: {response: TweetResponse, userId: number}) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="relative">
      <Link
        href={`/tweets/${response.tweetId}`}
        className={`block border-b border-neutral-200 px-5 py-3 hover:bg-neutral-50 
        dark:border-[#3c4043] dark:hover:bg-neutral-800
        ${ pathname === `/tweets/${params.id}` && response.userId === userId ? "bg-amber-50 dark:bg-neutral-800" : ""}
      `}>
        <div className="flex items-center gap-2 mb-3">
          <p className="font-bold text-black dark:text-[#e7e9ea]">{response.user.username}</p>
          <p
            className="text-sm text-neutral-600 dark:text-[#71767b]">{formatDate(response.created_at.toString())}</p>
        </div>
        <p className="line-clamp-10 whitespace-pre-wrap dark:text-[#e7e9ea]">{response.response}</p>
      </Link>

      <ResponseMenuSection userId={userId} responseUserId={response.userId} responseId={response.id}/>
    </div>
  );
}