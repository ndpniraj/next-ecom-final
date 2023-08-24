import React from "react";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>Contact layout</div>

      {children}
    </div>
  );
}
