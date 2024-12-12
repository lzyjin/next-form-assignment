import {deleteTweet} from "@/services/tweet-service";
import {Bounce, toast} from "react-toastify";
import {useState} from "react";
import {useParams, usePathname, useRouter} from "next/navigation";

export default function DeleteModal({tweetId}: {tweetId: number}) {
  const pathname = usePathname();
  const [isClosed, setIsClosed] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onDeleteClick = async () => {
    const result = await deleteTweet(tweetId);

    if (result) {
      toast.success('삭제되었습니다.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      if (pathname === `/tweets/${params.id}`) {
        router.push("/");
      } else {
        router.refresh();
      }

    }
  };

  const onCancelClick = () => {
    setIsClosed(true);
  }

  return (
    isClosed ?
      null :
      <div className="fixed left-0 top-0 w-screen h-screen z-10 flex justify-center items-center">
        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-40"/>
        <div className="bg-white shadow-lg rounded-xl w-[320px] overflow-hidden z-20 p-8">
          <h1 className="font-bold text-xl mb-2">게시물을 삭제할까요?</h1>
          <p className="text-[0.95rem] leading-snug text-neutral-700">
            이 동작은 취소할 수 없으며 내 프로필, 나를 팔로우하는 계정의 타임라인, 그리고 검색 결과에서 삭제됩니다.
          </p>
          <div className="flex flex-col gap-3 mt-5 *:w-full *:h-11 *:rounded-full font-bold">
            <button className="bg-[#f4212e] text-white" onClick={onDeleteClick}>삭제하기</button>
            <button className="border border-neutral-300" onClick={onCancelClick}>취소</button>
          </div>
        </div>
      </div>
  );
}