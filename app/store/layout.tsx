import SideBar from "@/components/SideBar";
import React, { ReactElement } from "react";
import NavBar from "@/components/NavBar";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LayoutEditStore({
  children,
}: {
  children: ReactElement;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect("/");
  }

  const { data, error } = await supabase.from("store").select();

  if (data === null || error !== null) {
    redirect(`/store&message=something-went-wrong-with-layoutstore`);
  }

  return (
    <main className="flex w-full">
      <SideBar dataStore={data} />
      <div className="flex flex-col w-full">
        <NavBar user={session.user.id} />
        {children}
      </div>
    </main>
  );
}
