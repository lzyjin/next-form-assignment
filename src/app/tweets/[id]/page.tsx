import {db} from "@/lib/db";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";

async function getTweet(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return tweet;
}

export default async function TweetDetail({params}: { params: {id: string}}) {
  const id = params.id;
  if (isNaN(Number(id))) {
    notFound();
  }

  const tweet = await getTweet(Number(id));
  // console.log(tweet);

  return (
    <div>
      <div>
        <Link href="/">&larr;</Link>
      </div>
      <div>
        <p>{tweet!.tweet}</p>
        <p>{formatDate(tweet!.created_at)}</p>
        <p>{tweet!.user.username}</p>
      </div>
    </div>
  );
}