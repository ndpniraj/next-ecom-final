import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import Navbar from "@components/navbar";

interface Props {
  children: ReactNode;
}

export default async function HomeLayout({ children }: Props) {
  return (
    <div className="max-w-screen-xl mx-auto xl:p-0 p-4">
      <Navbar />
      {children}
    </div>
  );
}
