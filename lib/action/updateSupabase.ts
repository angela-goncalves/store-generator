"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
interface IAttributeschildren {
  id: string;
  name: string;
  childrenValue: string[];
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

  // console.log("storeData in updateStore", storeData);
  const { error } = await supabase.from("store").upsert(storeData).select();

  // console.log("error updating store", error);

  if (error !== null) {
    redirect(
      `/store/edit-store?id=${storeId}&message=something-went-wrong-when-try-to-update-the-store`
    );
  }
  redirect(`/store?id=${storeId}`);
};

export const updateProduct = async (
  product: IFormDataUpdateProduct,
  storeId: string,
  inventory: IVariants[],
  attributesChildren: IAttributeschildren[]
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const idProduct = product.id;
  const name = product.name;
  const description = product.description;
  const price = product.price;
  const image = product.image;
  const collection_id = product.collectionId;
  const url = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/ç/g, "c")
    .replace(/[^a-zA-Z0-9]/g, "-");

  const updateProductWithCollection = collection_id
    ? {
        name,
        description,
        collection_id,
        price,
        url,
        store_id: storeId,
        image,
      }
    : {
        name,
        description,
        price,
        url,
        store_id: storeId,
        image,
      };

  const { error } = await supabase
    .from("products")
    .update(updateProductWithCollection)
    .eq("id", idProduct)
    .select();

  // console.log("error in update the product", error);

  await upsertInventory(inventory, storeId, idProduct);
  await upsertAttributes(attributesChildren, storeId, idProduct);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&productId=${product.id}&message=something-went-wrong-when-try-to-update-the-product`
    );
  }

  redirect(`/store/products?id=${storeId}`);
};

export const upsertInventory = async (
  inventory: IVariants[],
  storeId: string,
  idProduct: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const inventories = inventory.map((item) => {
    return {
      id: item.id,
      product_id: idProduct,
      attributeschildren: item.combination,
      price: Number(item.price) ?? 0,
      stock_level: Number(item.stock) ?? 0,
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

    // console.log("error deleting and inserting inventory", deleteError, error);

    if (error !== null) {
      redirect(
        `/store/products/add-products?id=${storeId}&message=something-went-wrong-when-try-to-replace-inventory`
      );
    }
  }

  // redirect(`/store/products?id=${storeId}`);
};

export const upsertAttributes = async (
  attributesChildren: IAttributeschildren[],
  storeId: string,
  idProduct: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const attributes = attributesChildren.map((item) => {
    return {
      id: item.id,
      product_id: idProduct,
      children_values: item.childrenValue,
      name: item.name,
    };
  });

  const { error } = await supabase
    .from("attributes")
    .upsert(attributes)
    .select();

  // console.log("error upserting attributes", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=something-went-wrong-when-try-to-upsert-inventory`
    );
  }

  // redirect(`/store/products?id=${storeId}`);
};

export const updateCollections = async (
  formData: FormDataType,
  storeId: string
) => {
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

  // console.log("error in update collections", error);

  if (data === null || error !== null) {
    redirect(
      `/store/collections/edit-collection?id=${storeId}&message=something-went-wrong-when-try-to-update`
    );
  }

  redirect(`/store/collections?id=${storeId}`);
};
