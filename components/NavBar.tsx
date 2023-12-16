import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import AuthButton from "./AuthButton";

export default async function NavBar() {
  const session = {
    user: {
      id: "41b622a8-0c84-468e-a9e0-8e05b3a667a1",
      email: "angelakgo20@gmail.com",
    },
  };

  return (
    <div className="w-full bg-white dark:bg-black self-center flex justify-between items-center p-3 text-sm">
      <Link href="/">store-generator</Link>
      <AuthButton user={session.user.id} />
    </div>
  );
}
