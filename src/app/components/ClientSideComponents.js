"use client";

import dynamic from "next/dynamic";

const AIChat = dynamic(() => import("./AIChat"), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function ClientSideComponents() {
  return (
    <>
      <AIChat />
      <CustomCursor />
    </>
  );
}
