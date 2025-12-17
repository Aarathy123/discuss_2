"use client";
import { startTransition, useActionState, useState } from "react";
import { createPostAction } from "@/actions";
import { Input, Textarea, Popover, PopoverContent, PopoverTrigger, Button } from "@nextui-org/react";
import FormButton from "@/components/formButton";

function PostForm({ topicId }: { topicId: string }) {
  const [state, formAction, isPending] = useActionState(createPostAction.bind(null, topicId), { error: {} });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4 p-4 w-80">
        <h3 className="text-lg font-bold">Create a Post</h3>
        <Input
          type="text"
          name="title"
          label="Title"
          labelPlacement="outside"
          placeholder="Title"
          className="w-full"
          isInvalid={!!state.error?.title}
          errorMessage={state.error?.title?.join(", ")}
        />
        <Textarea
          name="content"
          label="Content"
          labelPlacement="outside"
          placeholder="Content"
          rows={4}
          className="w-full"
          isInvalid={!!state.error?.content}
          errorMessage={state.error?.content?.join(", ")}
        />
        {state.error?._form?.length && <div className="text-red-500 rounded p-2 bg-red-200">
          {state.error?._form?.join(", ")}
        </div>}
        <FormButton isPending={isPending}>Create</FormButton>
      </div>
    </form>
  );
}

export default function PostCreationForm({ topicId }: { topicId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormKey((prev) => prev + 1);
    }
    setIsOpen(open);
  };

  return (
    <Popover placement="left" isOpen={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PostForm key={formKey} topicId={topicId} />
      </PopoverContent>
    </Popover>
  );
}