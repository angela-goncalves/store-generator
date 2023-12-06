"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const handleDeleteCollection = async (
  idcollection: UUID,
  storeId: UUID
) => {
  const collectionID = idcollection;
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", collectionID);
  if (error !== null) {
    redirect(
      `/store/collections?id=${storeId}&message=Something-went-wrong-when-try-to-delete`
    );
  }
  revalidatePath(`/store/collections?id=${storeId}`);
};
