import TopicCreateForm from "@/components/topic/topic-create-form";
import TopicList from "@/components/topic/topic-list";
import { fetchTopPosts } from "@/db/queries/post";
import PostList from "@/components/posts/post-list";
import { Divider } from "@nextui-org/react";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <Divider className="my-3" />
        <h3 className="text-lg font-bold">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}
