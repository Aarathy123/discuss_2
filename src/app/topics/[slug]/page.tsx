import PostCreationForm from "@/components/posts/post-creation-form";
import db from "@/db";
import { notFound } from "next/navigation";
import { fetchPostsBySlug } from "@/db/queries/post";
import PostList from "@/components/posts/post-list";

export default async function TopicShowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
  });
  if (!topic) {
    notFound();
  }
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">{topic.slug}</h1>
        <PostList fetchData={() => fetchPostsBySlug(slug)} />
      </div>
      <div className="col-span-1">
        <PostCreationForm topicId={topic.id} />
      </div>
    </div>
  )
}