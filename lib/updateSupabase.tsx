"use server";
import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

type FormDataType = {
  collectionID: string;
  nameCollection: string;
  descriptionCollection: string;
};
export const updateCollections = async (formData: FormDataType) => {
  const descriptionCollection = formData.descriptionCollection;
  const nameCollection = formData.nameCollection;
  const collectionid = formData.collectionID;
  console.log("formData in database", formData);
  const { data, error } = await supabase
    .from("collections")
    .update({ name: nameCollection, description: descriptionCollection })
    .eq("id", collectionid)
    .select();
  if (data === null || error !== null) {
    redirect(
      "/store/collections/edit-collection&message=something-went-wrong-when-try-to-update"
    );
  }
};
