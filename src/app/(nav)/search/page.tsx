import SearchBar from "@/components/search-bar";
import {SearchProps} from "@/lib/types";
import SearchResultTweet from "@/components/search-result-tweet";
import SearchResultUser from "@/components/search-result-user";
import {searchTweets, searchTweetsLatest, searchUsers} from "@/services/search-service";
import SearchResultTweetLatest from "@/components/search-result-tweet-latest";
import {getSession} from "@/lib/session";

export default async function Search({searchParams}: SearchProps) {
  const session = await getSession();
  const userId = session.id!;

  const query = searchParams?.query || '';
  const filter = searchParams?.filter || '';
  let initialTweets;
  let initialUsers;

  if (query) {
    if (filter === "popular") {
      initialTweets = [...await searchTweets(query)];
    }

    if (filter === "latest") {
      initialTweets = [...await searchTweetsLatest(query)];
    }

    if (filter === "user") {
      initialUsers = [...await searchUsers(query)];
    }
  }

  return (
    <div>
      <SearchBar />
      { query && filter === "popular" && <SearchResultTweet query={query} initialTweets={initialTweets ?? []} userId={userId} /> }
      { query && filter === "latest" && <SearchResultTweetLatest query={query} initialTweets={initialTweets ?? []} userId={userId} /> }
      { query && filter === "user" && <SearchResultUser query={query} initialUsers={initialUsers ?? []} /> }
    </div>
  );
}