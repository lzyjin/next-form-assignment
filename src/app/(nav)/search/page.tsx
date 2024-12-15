import {SearchProps} from "@/lib/types";
import SearchResultTweet from "@/components/search/search-result-tweet";
import SearchResultUser from "@/components/search/search-result-user";
import SearchResultTweetLatest from "@/components/search/search-result-tweet-latest";
import {getSession} from "@/lib/session";
import SearchBar from "@/components/search/search-bar";

export default async function Search({searchParams}: SearchProps) {
  const session = await getSession();
  const userId = session.id!;

  const query = searchParams?.query || '';
  const filter = searchParams?.filter || '';

  return (
    <div>
      <SearchBar />
      { query && filter === "popular" && <SearchResultTweet query={query} userId={userId} /> }
      { query && filter === "latest" && <SearchResultTweetLatest query={query} userId={userId} /> }
      { query && filter === "user" && <SearchResultUser query={query} /> }
    </div>
  );
}