import type { PostListItem } from '@/db/queries/post';

import Link from 'next/link';
import paths from '@/paths';

interface PostListProps {
  fetchData: () => Promise<PostListItem[]>;
}
// TODO: Get list of posts into this component somehow
export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();
  const renderedPosts = posts.map((post) => {
    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShowPath(post.topic.slug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2 pt-10">{renderedPosts}</div>;
}
