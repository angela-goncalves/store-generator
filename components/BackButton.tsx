"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BackButton({
  href,
  query,
}: {
  href?: string;
  query?: any;
}) {
  return (
    <div className="self-start">
      <Link
        href={query ? query : href}
        className="py-2 px-4 ml-16 w-max rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm">
        <ChevronLeft />
        Back
      </Link>
    </div>
  );
}
