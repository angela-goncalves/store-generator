import { getCollectionsOfStore } from "@/lib/action/getData";
import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 justify-between w-full min-h-screen">
      {children}
    </div>
  );
}
