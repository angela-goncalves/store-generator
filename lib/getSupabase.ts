"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getStore = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("store").select().eq("id", id);

  if (data === null || error !== null) {
    redirect(
      `/store?id=${id}&message=something-went-wrong-with-stores-in-sidebar`
    );
  }
  return data;
};