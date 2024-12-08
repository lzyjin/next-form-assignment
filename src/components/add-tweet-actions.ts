"use server";

import {z} from "zod";
import {db} from "@/lib/db";
import {getSession} from "@/lib/session";
import {redirect} from "next/navigation";

const formSchema = z.object({
  content: z.string({
    required_error: "내용을 입력하세요."
  }).trim().min(1, "한글자 이상 입력하세요."),
});

export async function postTweet(prevState: any, formData: FormData) {
  "use server";

  const data = {
    content: formData.get("content"),
  };

  const result = formSchema.safeParse(data);
  console.log(result);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result);
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