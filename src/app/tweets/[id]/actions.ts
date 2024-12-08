"use server";

import {revalidateTag} from "next/cache";
import {db} from "@/lib/db";
import {getSession} from "@/lib/session";

export const likeTweet = async (tweetId: number) => {
  await new Promise((r) => setTimeout(r, 5000));

  try {
    const session = await getSession();
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });

    revalidateTag(`like-status-${tweetId}`);

  } catch (e) {
    console.log(e);
  }
};

export const dislikeTweet = async (tweetId: number) => {
  await new Promise((r) => setTimeout(r, 5000));

  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });

    revalidateTag(`like-status-${tweetId}`);

  } catch (e) {
    console.log(e);
  }
};