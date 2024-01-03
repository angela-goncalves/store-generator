"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const idProduct = formData.id;
  const name = formData.name;
  const description = formData.description;
  const price = formData.price;
  const image = formData.image;
  const collection_id = formData.collectionId;
  const updateProductWithCollection = collection_id
    ? {
        name,
        description,
        collection_id,
        price,
        store_id: storeId,
        image,
      }
    : {
        name,
        description,
        price,
        store_id: storeId,
        image,
      };

  const { error } = await supabase
    .from("products")
    .update(updateProductWithCollection)
    .eq("id", idProduct)
    .select();

  // console.log("error in update the product", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&productId=${formData.id}&message=something-went-wrong-when-try-to-update-the-product`
    );
  }
  redirect(`/store/products?id=${storeId}`);
};

type FormDataType = {
  collectionID: string;
  nameCollection: string;
  descriptionCollection: string;
};

export const updateCollections = async (formData: FormDataType) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const descriptionCollection = formData.descriptionCollection;
  const nameCollection = formData.nameCollection;
  const collectionid = formData.collectionID;

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
