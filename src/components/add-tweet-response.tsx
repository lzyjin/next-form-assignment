// "use client";
//
// import {useFormState} from "react-dom";
// import {addTweetResponse} from "@/components/add-tweet-response-action";
// import {useEffect, useRef} from "react";
//
// interface AddTweetResponseProps {
//   tweetId: number;
// }
//
// export default function AddTweetResponse({tweetId}: AddTweetResponseProps) {
//   const [state, action] = useFormState(addTweetResponse, null);
//   const ref = useRef<HTMLFormElement>(null);
//
//   useEffect(() => {
//     if (state?.success) {
//       ref.current?.reset();
//     }
//   }, [state]);
//
//   return (
//     <div className="w-full bg-white px-5 py-3">
//       <form action={action} className="flex gap-2" ref={ref}>
//         <input name="tweetId" type="hidden" value={tweetId} />
//         <input
//           name="response"
//           type="text"
//           placeholder="답글 게시하기"
//           required
//           className="w-full bg-white py-2.5 px-5 outline-0 rounded-full border border-neutral-200" />
//         <button
//           className="w-24 text-center h-12 bg-neutral-100 rounded-full font-bold disabled:bg-neutral-300 disabled:text-neutral-500">
//           답글
//         </button>
//       </form>
//     </div>
//   );
// }