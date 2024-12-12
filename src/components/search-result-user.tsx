import {SearchUserResultProps} from "@/lib/types";
import {searchUsers} from "@/services/search-service";
import UserItem from "@/components/user-item";

export default async function SearchResultUser({query, initialUsers}: SearchUserResultProps) {
  const users = await searchUsers(query);

  return (
    <div>
      {
        users?.map(user => (
          <UserItem key={user.id} user={user} />
        ))
      }
    </div>
  );
}