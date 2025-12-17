"use client";
import { createTopicAction } from "@/actions";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { useActionState, startTransition, useState } from "react";
import FormButton from "@/components/formButton";

function TopicForm() {
  const [state, formAction, isPending] = useActionState(createTopicAction, {
    success: false,
  });

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
        <h3 className="text-lg font-bold">Create a Topic</h3>
        <Input
          type="text"
          name="slug"
          label="Name"
          labelPlacement="outside"
          placeholder="Topic Name"
          className="w-full"
          isInvalid={!!state.error?.slug}
          errorMessage={state.error?.slug?.join(", ")}
        />
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Topic Description"
          rows={4}
          isInvalid={!!state.error?.description}
          errorMessage={state.error?.description?.join(", ")}
        />
        <div className="text-red-500">
          {state.error?._form?.join(", ")}
        </div>
        <FormButton isPending={isPending}>Create</FormButton>
      </div>
    </form>
  );
}

export default function TopicCreateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormKey((prev) => prev + 1);
    }
    setIsOpen(open);
  };

  return (
    <div>
      <Popover placement="left" isOpen={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <Button color="primary">Create a Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <TopicForm key={formKey} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
