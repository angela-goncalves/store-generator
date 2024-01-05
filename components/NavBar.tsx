import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { ConfigMenu } from "./ConfigMenu";

export default async function NavBar({ user }: { user: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getSession();

  const { session } = data;

  if (session === null || error !== null) {
    return (
      <div className="w-full bg-secondary self-center flex justify-between items-center p-5 text-sm text-secondary-foreground">
        <Link href="/">store-generator</Link>
        <Link
          href="/login?signin=true"
          className="py-2 px-3 flex rounded-md no-underline border hover:bg-neutral-light hover:text-secondary">
          Log in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-background self-center flex justify-between items-center p-3 text-sm border border-b-neutral-dark">
      <Link href="/">store-generator</Link>
      {session.user.id && (
        <div className="flex items-center gap-4">
          <ConfigMenu />
        </div>
      )}
    </div>
  );
}
