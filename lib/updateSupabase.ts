"use server";
import { createClient } from "@/utils/supabase/server";
import { UUID } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

type IFormDataUpdateProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  collectionId: string;
};
export const updateProduct = async (
  formData: IFormDataUpdateProduct,
  storeid: string
) => {
  const idProduct = formData.id;
  const name = formData.name;
  const description = formData.description;
  const price = formData.price;
  const image = formData.image;
  const collection_id = formData.collectionId;

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
