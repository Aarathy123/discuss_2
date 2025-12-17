import { Button } from "@nextui-org/react";

interface FormButtonProps {
  children: React.ReactNode;
  isPending: boolean;
}
export default function FormButton({ children, isPending }: FormButtonProps) {
  return (
    <Button type="submit" isLoading={isPending}>
      {children}
    </Button>
  );
}
