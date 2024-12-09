"use server";

import {db} from "@/lib/db";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";
import {addTweetSchema} from "@/lib/schemas";

export async function postTweet(prevState: unknown, formData: FormData) {
  "use server";

  const data = {
    content: formData.get("content"),
  };

  const result = addTweetSchema.safeParse(data);
  console.log(result);

  if (!result.success) {
    return result.error.flatten();

  } else {
    const session = await getSession();
    const userId = session.id!;

    // db에 저장
    const newTweet = await db.tweet.create({
      data: {
        tweet: result.data.content,
        userId: userId,
      },
      select: {
        id: true,
      },
    });

    // revalidatePath(`/`);
    redirect(`/tweets/${newTweet.id}`);
  }
}