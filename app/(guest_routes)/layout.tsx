import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "@components/navbar";

interface Props {
  children: ReactNode;
}

export default async function GuestLayout({ children }: Props) {
  const session = await auth();
  console.log(session);
  if (session) return redirect("/");

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
