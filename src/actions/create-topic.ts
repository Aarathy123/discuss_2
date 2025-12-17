"use server";

import db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Topic } from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
import paths from "@/paths";

const createTopicSchema = z.object({
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, { message: "Must be lowercase letters or dashes only" }),
  description: z.string().min(10),
});

interface CreateTopicState {
  error?: { slug?: string[]; description?: string[]; _form?: string[] };
  success?: boolean;
}
export async function createTopic(
  formState: CreateTopicState,
  formData: FormData
): Promise<CreateTopicState> {
  const result = createTopicSchema.safeParse({
    slug: formData.get("slug"),
    description: formData.get("description"),
  });

  const session = await auth();
  if (!session?.user) {
    return { error: { _form: ["You must be logged in to create a topic"] } };
  }
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }
  let topic: Topic;
  try {
    const { slug, description } = result.data;
    topic = await db.topic.create({
      data: {
        slug,
        description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: { _form: [error.message] } };
    }
    return { error: { _form: ["Failed to create topic"] } };
  }
  revalidatePath(paths.getHomePath());
  redirect(paths.topicShowPath(topic.slug));
}
