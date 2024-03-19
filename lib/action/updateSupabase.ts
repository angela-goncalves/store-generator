"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { saveStorage } from "./storage";

interface ISocialMedia {
  name: string;
  url: string;
}

interface IStore {
  id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  whatsapp: string;
  contact_mail: string;
  social_media: ISocialMedia[];
}

export const updateStore = async (formData: IStore, storeId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect(`/login?signin=true`);
  }

  const storeData = {
    ...formData,
    user_id: session.user.id,
  };

  const { error } = await supabase.from("store").upsert(storeData).select();

  if (error !== null) {
    redirect(
      `/store/edit-store?id=${storeId}&message=something-went-wrong-when-try-to-update-the-store`
    );
  }
  redirect(`/store?id=${storeId}`);
};

export const updateProduct = async (
  product: Products,
  storeId: string,
  inventory: Inventory[],
  attributesChildren: Attributes[],
  newImages: any
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect(`/login?signin=true`);
  }

  const uploadImages = await saveStorage(newImages, storeId, product.id);

  let images: string[] = [];
  if (uploadImages && uploadImages.length > 0) {
    images = uploadImages.map((item) => {
      return item.data?.publicUrl;
    });
  }

  const updateProductWithCollection = {
    name: product.name,
    description: product.description,
    collection_id: product.collection_id || null,
    price: product.price,
    url:
      product.name &&
      product.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ñ/g, "n")
        .replace(/ç/g, "c")
        .replace(/[^a-zA-Z0-9]/g, "-"),
    store_id: storeId,
    images: product.images?.concat(images),
  };

  const { error } = await supabase
    .from("products")
    .update(updateProductWithCollection)
    .eq("id", product.id)
    .select();

  await upsertInventory(inventory, storeId, product.id);
  await upsertAttributes(attributesChildren, storeId, product.id);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&productId=${product.id}&message=something-went-wrong-when-try-to-update-the-product`
    );
  }

  redirect(`/store/products?id=${storeId}`);
};

export const upsertInventory = async (
  inventory: Inventory[],
  storeId: string,
  idProduct: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const inventories = inventory.map((item) => {
    return {
      id: item.id,
      product_id: idProduct,
      attributeschildren: item.attributeschildren,
      price: Number(item.price) ?? 0,
      stock_level: Number(item.stock_level) ?? 0,
    };
  });

  const { error: deleteError } = await supabase
    .from("inventory")
    .delete()
    .eq("product_id", idProduct);

  if (deleteError === null) {
    const { error } = await supabase
      .from("inventory")
      .insert(inventories)
      .select();

    if (error !== null) {
      redirect(
        `/store/products/add-products?id=${storeId}&message=something-went-wrong-when-try-to-replace-inventory`
      );
    }
  }

  // redirect(`/store/products?id=${storeId}`);
};

export const upsertAttributes = async (
  attributesChildren: Attributes[],
  storeId: string,
  idProduct: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const attributes = attributesChildren.map((item) => {
    return {
      id: item.id,
      product_id: idProduct,
      children_values: item.children_values,
      name: item.name,
    };
  });

  const { error } = await supabase
    .from("attributes")
    .upsert(attributes)
    .select();

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=something-went-wrong-when-try-to-upsert-inventory`
    );
  }
};

export const updateCollections = async (
  formData: Collections,
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const description = formData.description;
  const name = formData.name;
  const collectionid = formData.id;

  const { data, error } = await supabase
    .from("collections")
    .update({ name, description })
    .eq("id", collectionid)
    .select();

  if (data === null || error !== null) {
    redirect(
      `/store/collections/edit-collection?id=${storeId}&message=something-went-wrong-when-try-to-update`
    );
  }

  redirect(`/store/collections?id=${storeId}`);
};
