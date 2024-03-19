"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { saveStorage } from "./action/storage";

interface IStore {
  id: string;
  name: string;
  description: string;
  location: string;
}
interface FormCollections {
  name: string;
  id: string;
}
interface IFormProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  collectionId: string;
  collectionName: string;
}
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

export const handleInsertStore = async (formData: IStore) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect(`/login?signin=true`);
  }

  const name = formData.name;
  const description = formData.description;
  const location = formData.location;
  const store =
    formData.id !== ""
      ? {
          id: formData.id,
          name,
          description,
          location,
          user_id: session.user.id,
        }
      : {
          name,
          description,
          location,
          user_id: session.user.id,
        };

  const { data, error } = await supabase.from("store").upsert([store]).select();

  if (error !== null) {
    redirect("/add-store?message=store-error");
  }
  redirect(`/store?id=${data[0].id}`);
};

export const handleInsertCollections = async (
  formData: FormCollections[],
  storeId: string,
  isFromProductPage?: boolean
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect(`/login?signin=true`);
  }

  const collections = formData.map((item) => {
    return item.id === ""
      ? {
          name: item.name,
          store_id: storeId,
          user_id: session.user.id,
        }
      : {
          id: item.id,
          name: item.name,
          store_id: storeId,
          user_id: session.user.id,
        };
  });

  const { data, error } = await supabase
    .from("collections")
    .insert(collections)
    .select();

  if (error !== null) {
    redirect(`/store/collections?id=${storeId}&message=collections-errors`);
  }

  if (isFromProductPage) {
    return data;
  } else {
    redirect(`/store/collections?id=${storeId}`);
  }
};

export type ExtendedProducts = Products & {
  collectionName: string;
};

export const handleInsertProduct = async (
  product: ExtendedProducts,
  storeId: string,
  inventory: Inventory[],
  attributesChildren: Attributes[],
  imagesToStorage: FormData
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect(`/login?signin=true`);
  }

  const uploadImages = await saveStorage(imagesToStorage, storeId, product.id);

  let images: any[] = [];
  if (uploadImages && uploadImages.length > 0) {
    images = uploadImages.map((item) => {
      return item.data?.publicUrl;
    });
  }

  let collectionID = "";

  if (product.collectionName) {
    const isFromProductPage = true;
    const collection = await handleInsertCollections(
      [{ id: "", name: product.collectionName }],
      storeId,
      isFromProductPage
    );

    collectionID = collection.length > 0 ? collection[0].id : "";
  }

  const productAdded = [
    {
      id: product.id,
      collection_id: product.collectionName ? collectionID : null,
      description: product.description,
      images,
      name: product.name,
      price: Number(product.price),
      store_id: storeId,
      url:
        product.name &&
        product.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/ñ/g, "n")
          .replace(/ç/g, "c")
          .replace(/[^a-zA-Z0-9]/g, "-"),
    },
  ];

  const { data, error } = await supabase
    .from("products")
    .insert(productAdded)
    .select();

  if (error !== null) {
    const errorMessage = error.message
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ñ/g, "n")
      .replace(/ç/g, "c")
      .replace(/[^a-zA-Z0-9]/g, "-");
    redirect(
      `/store/products/add-products?id=${storeId}&message=${errorMessage}`
    );
  }

  if (data !== null && data[0].id) {
    await insertAttributes(attributesChildren, storeId, data[0].id);
    await handleInsertInventory(inventory, storeId, data[0].id);
  }

  redirect(`/store/products?id=${storeId}`);
};

const handleInsertInventory = async (
  variants: Inventory[],
  storeid: string,
  productId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const inventory = variants.map((item) => {
    return {
      id: item.id,
      product_id: productId,
      attributeschildren: item.attributeschildren,
      price: Number(item.price) ?? 0,
      stock_level: Number(item.stock_level) ?? 0,
    };
  });

  const { error } = await supabase.from("inventory").insert(inventory).select();

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeid}&productId=${productId}&message=inventory-error`
    );
  }
};

export const insertAttributes = async (
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
    .insert(attributes)
    .select();

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=something-went-wrong-when-try-to-upsert-inventory`
    );
  }
};
