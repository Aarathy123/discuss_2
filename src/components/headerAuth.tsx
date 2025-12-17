"use client";

import { signInAction, signOutAction } from "@/actions";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = <Skeleton className="w-10 h-10 rounded-full animate-pulse" />;
  } else if (session.data?.user) {
    authContent = (
      <>
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.data.user.image ?? ""} />
          </PopoverTrigger>
          <PopoverContent>
            <form action={signOutAction}>
              <Button type="submit">Sign Out</Button>
            </form>
          </PopoverContent>
        </Popover>
      </>
    );
  } else if (!session.data?.user) {
    authContent = (
      <>
        <form action={signInAction}>
          <Button type="submit">Sign In</Button>
        </form>
        <form action={signInAction}>
          <Button type="submit">Sign Up</Button>
        </form>
      </>
    );
  }
  return <>{authContent}</>;
}
