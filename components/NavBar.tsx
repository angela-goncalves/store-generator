import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function NavBar() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);

  // const { data, error } = await supabase.auth.getSession();

  // const { session } = data;
  // if (session === null || error !== null) {
  //   redirect(`/login?signin=true`);
  // }
  return (
    <div className="w-full bg-white dark:bg-black self-center flex justify-between items-center p-3 text-sm">
      <Link href="/">store-generator</Link>
      <AuthButton />
    </div>
  );
}
