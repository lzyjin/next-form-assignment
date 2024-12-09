"use server";

import {db} from "@/lib/db";
import {getSession} from "@/lib/session";
import {revalidateTag} from "next/cache";
import {tweetResponseSchema} from "@/lib/schemas";


export async function addTweetResponse(formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const response= formData.get("response");
  const tweetId = formData.get("tweetId");

  const result = tweetResponseSchema.safeParse(response);

  const session = await getSession();

  if (!result.success) {

  } else {
    if(session.id) {
      const newResponse = await db.response.create({
        data: {
          response: result.data,
          tweetId: Number(tweetId),
          userId: session.id,
        },
        select: {
          id: true,
        },
      });

      revalidateTag(`responses-${tweetId}`);
    }
  }
}