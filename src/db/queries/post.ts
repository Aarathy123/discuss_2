import db from '@/db';

export type PostListItem = Awaited<ReturnType<typeof fetchPostsBySlug>>[number];

export function fetchPostsBySlug(slug: string) {
  return db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    include: {
      topic: {
        select: {
          slug: true,
        }
      },
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}

export function fetchTopPosts(): Promise<PostListItem[]> {
  return db.post.findMany({
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    include: {
      topic: {
        select: {
          slug: true,
        }
      },
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    take: 5,
  });
}

export function searchPosts(term: string): Promise<PostListItem[]> {
  return db.post.findMany({
    include: {
      topic: {
        select: {
          slug: true,
        }
      },
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    where: {
      OR: [
        { title: { contains: term } },
        { content: { contains: term } },
      ],
    },
  });
}