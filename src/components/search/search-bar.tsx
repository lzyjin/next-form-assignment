"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentKeyword = searchParams.get("query");
  const currentFilter = searchParams.get("filter");
  const { replace } = useRouter();

  const formAction = (formData: FormData) => {
    const keywordData = formData.get("searchKeyword");
    const filterData = formData.get("filter") ?? "popular";

    if (keywordData && filterData) {
      const keyword = String(keywordData);
      const filter = String(filterData);
      const params = new URLSearchParams(searchParams);

      if (keyword) {
        params.set('query', keyword);
      } else {
        params.delete('query');
      }

      if (filter) {
        params.set('filter', filter);
      } else {
        params.delete('filter');
      }

      replace(`${pathname}?${params.toString()}`);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filter = e.currentTarget.value;
    const params = new URLSearchParams(searchParams);
    params.set('filter', filter);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={`w-full px-5 border-b border-neutral-200 dark:border-[#3c4043] pt-3`}>
      <form action={formAction} className="">
        <div className="border border-neutral-200 rounded-full relative w-full overflow-hidden mb-3
          flex items-center gap-5 px-5
          transition-shadow ring-offset-2 has-[:focus]:ring-2 has-[:focus]:ring-amber-300
          dark:ring-offset-[#1f1f1f] dark:border-0 dark:bg-[#202327] dark:has-[:focus]:ring-1 dark:has-[:focus]:text-amber-300"
        >
          <MagnifyingGlassIcon className="w-6"/>
          <input
            id="searchKeyword"
            name="searchKeyword"
            className="w-full bg-transparent py-2.5 outline-0 disabled:bg-neutral-100 dark:text-[#e7e9ea]"
            defaultValue={searchParams.get("query")?.toString()}
            placeholder="검색"
          />
        </div>
        {
          currentKeyword && (
            <div className="flex gap-5 text-center text-neutral-400 dark:text-[#71767b] *:flex-auto *:cursor-pointer *:pt-3">

              <div className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <div className="relative pb-3">
                  <label className={`${currentFilter === "popular" && "font-bold text-black dark:text-[#e7e9ea]"}`}>
                    <input type="radio" name="filter" value="popular" className="hidden" defaultChecked={true} onChange={onChange}/>
                    인기
                  </label>
                  {currentFilter === "popular" && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-amber-300"/>}
                </div>
              </div>

              <div className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <div className="relative pb-3">
                  <label className={`${currentFilter === "latest" && "font-bold text-black dark:text-[#e7e9ea]"}`}>
                    <input type="radio" name="filter" value="latest" className="hidden" onChange={onChange}/>
                    최신
                  </label>
                  {currentFilter === "latest" && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-amber-300"/>}
                </div>
              </div>

              <div className="hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <div className="relative pb-3">
                  <label className={`${currentFilter === "user" && "font-bold text-black dark:text-[#e7e9ea]"}`}>
                    <input type="radio" name="filter" value="user" className="hidden" onChange={onChange}/>
                    사용자
                  </label>
                  {currentFilter === "user" && <span className="absolute left-0 bottom-0 w-full h-1 rounded-sm bg-amber-300"/>}
                </div>
              </div>

            </div>
          )
        }
      </form>
    </div>
  );
}