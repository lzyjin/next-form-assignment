import GoBackButton from "@/components/go-back-button";
import {getSession} from "@/lib/session";
import {notFound} from "next/navigation";
import EditUserInfo from "@/components/edit-user-info";
import {getUserInfo} from "@/services/user-service";
import EditUserPassword from "@/components/edit-user-password";

export default async function ProfileEdit({params}: {params: {username: string}}) {
  const session = await getSession();
  const userId = session.id;
  const username = decodeURIComponent(params.username);

  if (!userId) {
    notFound();
  }

  const user = await getUserInfo(userId);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <div className="p-5 border-b border-neutral-200">
        <GoBackButton/>
      </div>
      <div className="px-5">
        <h1 className="text-center font-bold text-xl my-5">회원 정보 수정</h1>
        <div className="flex flex-col gap-10">
          <div>
            <p className="font-bold mb-5">기본정보 수정</p>
            <EditUserInfo username={username} email={user.email} bio={user.bio} />
          </div>
          <div>
            <p className="font-bold mb-5">비밀번호 변경</p>
            <EditUserPassword />
          </div>
        </div>
      </div>
    </div>
  );
}