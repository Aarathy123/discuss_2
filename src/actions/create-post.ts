'use server'

import { auth } from '@/auth';
import db from '@/db';
import paths from '@/paths';
import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(10, { message: "Content must be at least 10 characters" }),
});

interface CreatePostState {
  error?: { title?: string[]; content?: string[]; _form?: string[] };
}

export async function createPost(topicId: string, formState: CreatePostState, formData: FormData): Promise<CreatePostState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  const topic = await db.topic.findFirst({
    where: {
      id: topicId,
    },
  });
  if (!topic) {
    return { error: { _form: ["Topic not found"] } };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { error: { _form: ["You must be logged in to create a post"] } };
  }

  if (!result.success) {
    if (result.error) {
      return { error: result.error.flatten().fieldErrors };
    }
    return { error: { _form: ["Invalid submission"] } };
  }

  if (!topicId) {
    return { error: { _form: ["Topic ID is required"] } };
  }
  const { title, content } = result.data;
  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title,
        content,
        topicId,
        userId: session.user.id,
      },
    }); 
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: { _form: [error.message] } };
    }
    return { error: { _form: ["Failed to create post"] } };
  }
  revalidatePath(paths.topicShowPath(topic.slug))
  revalidatePath('/')
  redirect(paths.postShowPath(topic.slug, post.id))
}