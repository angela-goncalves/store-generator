import Link from "next/link";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 justify-between w-full min-h-screen">
      {children}
      <footer className="w-full py-4 bg-white flex flex-col mt-10">
        <div className="self-end text-neutral-medium p-4 ">
          <p>Built with Next.js, Tailwind, Supabase and Vercel</p>
          <Link href="https://github.com/angela-goncalves">by Angela</Link>
        </div>
      </footer>
    </div>
  );
}
