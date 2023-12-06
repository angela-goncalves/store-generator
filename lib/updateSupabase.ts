"use server";
import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

type FormDataType = {
  collectionID: UUID;
  nameCollection: string;
  descriptionCollection: string;
  id: string;
};
export const updateProduct = async (formData: any, storeid: string) => {
  const idProduct = formData.id as string;
  const name = formData.name as string;
  const description = formData.description as string;
  const price = formData.price as string;
  const image = formData.image as string;
  const collection_id = formData.collection_id as string;

  const { data, error } = await supabase
    .from("products")
    .update({ name, description, collection_id, price, image })
    .eq("id", idProduct)
    .select();

  if (data === null || error !== null) {
    redirect(
      `/store/products/add-products?id=${storeid}&message=something-went-wrong-when-try-to-update-the-product`
    );
  }
  redirect(`/store/products?id=${storeid}`);
};
