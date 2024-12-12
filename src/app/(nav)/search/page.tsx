import SearchBar from "@/components/search-bar";
import {SearchProps} from "@/lib/types";
import SearchResultTweet from "@/components/search-result-tweet";
import SearchResultUser from "@/components/search-result-user";
import SearchResultTweetLatest from "@/components/search-result-tweet-latest";
import {getSession} from "@/lib/session";

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