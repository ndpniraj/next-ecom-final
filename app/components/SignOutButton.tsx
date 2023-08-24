import { signOut } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SignOutButton({ children }: Props) {
  return (
    <div
      onClick={async () => {
        await signOut();
      }}
    >
      {children}
    </div>
  );
}
