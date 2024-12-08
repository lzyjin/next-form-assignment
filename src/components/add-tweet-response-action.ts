"use server";

import {z} from "zod";
import {db} from "@/lib/db";
import {getSession} from "@/lib/session";
import {revalidatePath} from "next/cache";

const formSchema = z.object({
  response: z.string().trim().min(1),
  tweetId: z.any(),
});

export async function addTweetResponse(formData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const data = {
    response: formData.get("response"),
    tweetId: formData.get("tweetId"),
  };

  const result = formSchema.safeParse(data);
  // console.log(result);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten(),
    };

  } else {
    const session = await getSession();

    const response = await db.response.create({
      data: {
        response: result.data.response,
        tweetId: Number(result.data.tweetId),
        userId: session.id!,
      },
      select: {
        id: true,
      },
    });

    // console.log("---------------")
    // console.log("db에 답글 저장 성공");
    // console.log(response);

    revalidatePath(`/tweets/${result.data.tweetId}`);

    return {
      success: true,
    };
  }
}