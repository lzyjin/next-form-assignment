import {formatDate} from "@/lib/utils";
import {ProfileInfoProps} from "@/lib/types";

export default function ProfileInfo({username, createdAt}: ProfileInfoProps) {
  return (
    <div>
      <p>{username}</p>
      <p>가입일: {formatDate(createdAt)}</p>
    </div>
  );
}