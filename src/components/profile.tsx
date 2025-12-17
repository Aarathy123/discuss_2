'use client'

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  console.log(session);
  return (
    <div>
      {session.data?.user && <p>Signed in as {session.data.user.name}</p>}
    </div>
  );
}