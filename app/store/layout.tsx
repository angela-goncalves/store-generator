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

  const { data, error } = await supabase.from("store").select();

  if (data === null || error !== null) {
    redirect(`/store&message=something-went-wrong-with-stores-in-sidebar`);
  }

  return (
    <main className="flex flex-col w-full justify-center">
      <NavBar />
      <div className="flex">
        <SideBar dataStore={data} />
        {children}
      </div>
    </main>
  );
}
