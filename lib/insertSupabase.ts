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

export const handleInsertProduct = async (
  product: IFormProduct,
  storeId: string,
  inventory: IVariants[],
  attributesChildren: IAttributeschildren[],
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

  const uploadImages = await saveStorage(imagesToStorage, storeId);

  let images: any[] = [];
  if (uploadImages && uploadImages.length > 0) {
    images = uploadImages.map((item) => {
      return item.data?.publicUrl;
    });
  }

  const id = product.id;
  const name = product.name;
  const description = product.description;
  const price = product.price;

  const url = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/ç/g, "c")
    .replace(/[^a-zA-Z0-9]/g, "-");

  if (product.collectionName) {
    const isFromProductPage = true;
    const collection = await handleInsertCollections(
      [{ id: "", name: product.collectionName }],
      storeId,
      isFromProductPage
    );

    //errors about the collection insert is handle in handleInsertCollections
    if (collection.length > 0) {
      const productAdded = [
        {
          id,
          name,
          description,
          price: Number(price),
          images,
          url,
          collection_id: collection[0].id,
          store_id: storeId,
        },
      ];

      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert(productAdded)
        .select();

      if (productError !== null) {
        redirect(
          `/store/products/add-products?id=${storeId}&message=error-when-try-to-insert-products`
        );
      }

      if (productData[0].id) {
        await handleInsertInventory(inventory, storeId, productData[0].id);
      }
    }
  }

  const productAdded = [
    {
      id,
      name,
      description,
      price: Number(price),
      images,
      url,
      collection_id: product.collectionId ? product.collectionId : null,
      store_id: storeId,
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
  variants: IVariants[],
  storeid: string,
  productId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const inventory = variants.map((item) => {
    return {
      id: item.id,
      product_id: productId,
      attributeschildren: item.combination,
      price: Number(item.price) ?? 0,
      stock_level: Number(item.stock) ?? 0,
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
    .insert(attributes)
    .select();

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=something-went-wrong-when-try-to-upsert-inventory`
    );
  }
};
