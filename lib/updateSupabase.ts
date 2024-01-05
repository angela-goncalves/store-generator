"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormDataType = {
  collectionID: string;
  nameCollection: string;
  descriptionCollection: string;
};

type IFormDataUpdateProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  collectionId: string;
};
interface IVariants {
  id: string;
  combination: string;
  price: string;
  stock: string;
}

export const updateProduct = async (
  formData: IFormDataUpdateProduct,
  storeId: string,
  inventory: IVariants[]
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

  console.log("error in update the product", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&productId=${formData.id}&message=something-went-wrong-when-try-to-update-the-product`
    );
  }
  redirect(`/store/products?id=${storeId}`);
};

export const updateInventory = async (
  inventory: IVariants,
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const id = inventory.id;
  const attributeschildren = inventory.combination;
  const price = Number(inventory.price) ?? 0;
  const stock_leve = Number(inventory.stock) ?? 0;

  const { data, error } = await supabase
    .from("inventory")
    .update({ id, attributeschildren, price, stock_leve })
    .eq("id", id)
    .select();

  if (data === null || error !== null) {
    redirect(
      "/store/collections/edit-collection&message=something-went-wrong-when-try-to-update"
    );
  }

  redirect(`/store/products?id=${storeId}`);
};

export const updateCollections = async (formData: FormDataType) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const description = formData.descriptionCollection;
  const name = formData.nameCollection;
  const collectionid = formData.collectionID;

  const { data, error } = await supabase
    .from("collections")
    .update({ name, description })
    .eq("id", collectionid)
    .select();
  if (data === null || error !== null) {
    redirect(
      "/store/collections/edit-collection&message=something-went-wrong-when-try-to-update"
    );
  }
};
