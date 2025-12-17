import { searchPosts } from "@/db/queries/post";
import PostList from "@/components/posts/post-list";

interface SearchPageProps {
  searchParams: Promise<{ term: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">Search Results for: {term}</h1>
        <PostList fetchData={() => searchPosts(term)} />
      </div>
    </div>
  );
}