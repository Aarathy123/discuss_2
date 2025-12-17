import Link from "next/link";
import { Chip } from "@nextui-org/react";
import db from "@/db";
import { Topic } from "@prisma/client";
import paths from "@/paths";

export default async function TopicList() {
  const topics = await db.topic.findMany();
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {topics.map((topic: Topic) => (
        <div key={topic.id}>
          <Link href={paths.topicShowPath(topic.slug)}>
            <Chip color="warning" variant="shadow">
              {topic.slug}
            </Chip>
          </Link>
        </div>
      ))}
    </div>
  );
}
