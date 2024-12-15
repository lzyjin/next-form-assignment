"use client";

import {SearchUserResultProps, User} from "@/lib/types";
import {moreSearchUsers, searchUsers} from "@/services/search-service";
import UserItem from "@/components/user-item";
import {useEffect, useRef, useState} from "react";

export default function SearchResultUser({query}: SearchUserResultProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function setInitialUsers() {
      const initialUsers = await searchUsers(query);
      setUsers(initialUsers);
    }

    setInitialUsers();
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries, observer) => {
        const element = entries[0];

        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newTweets = await moreSearchUsers(query, page + 1);

          if (newTweets.length !== 0) {
            setPage(prev => prev + 1);
            setUsers(prev => [...prev, ...newTweets]);
            setIsLoading(false);

          } else {
            setIsLastPage(true);
          }
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    }

  }, [page]);

  return (
    <div>
      { users.length === 0 && <p className="text-center mt-10">검색 결과가 없습니다.</p> }
      {
        users?.map(user => (
          <UserItem key={user.id} user={user} />
        ))
      }
      {
        !isLastPage ?
        <span ref={trigger} className="opacity-0">{ isLoading ? "Loading..." : "Load more" }</span> :
        null
      }
    </div>
  );
}