"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FormCollections {
  name: string;
  id: string;
}
interface IFormProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  collectionId: string;
}
interface IVariants {
  id: string;
  combination: string;
  price: string;
  stock: string;
}

export const handleInsertStore = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const { session } = sessionData;

  if (session === null || sessionError !== null) {
    redirect(`/login?signin=true`);
  }

  const siteName = formData.get("siteName") as string;
  const siteDescription = formData.get("siteDescription") as string;
  const siteLocation = formData.get("siteLocation") as string;

  const { data, error } = await supabase
    .from("store")
    .insert([
      {
        name: siteName,
        description: siteDescription,
        location: siteLocation,
        user_id: session.user.id,
      },
    ])
    .select();

  // console.log("error inserting store", error);

  if (error !== null) {
    redirect("/add_store?message=store-error");
  }
  redirect(`/store?id=${data[0].id}`);
};

export const handleInsertCollections = async (
  formData: FormCollections[],
  storeId: string
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
    return {
      id: item.id,
      name: item.name,
      store_id: storeId,
      user_id: session.user.id,
    };
  });

  const { error } = await supabase
    .from("collections")
    .insert(collections)
    .select();

  // console.log("error inserting collections", error);

  if (error !== null) {
    redirect(`/store/collections?id=${storeId}&message=collections-errors`);
  }

  redirect(`/store/collections?id=${storeId}`);
};

export const handleInsertProduct = async (
  product: IFormProduct,
  storeid: string,
  inventory: IVariants[]
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const id = product.id;
  const name = product.name;
  const description = product.description;
  const price = product.price;
  const image = product.image;
  const collection_id =
    product.collectionId === "" ? null : product.collectionId;

  const productAdded = [
    {
      id,
      name,
      description,
      price: Number(price),
      image,
      collection_id,
      store_id: storeid,
    },
  ];

  const { data, error } = await supabase
    .from("products")
    .insert(productAdded)
    .select();

  // console.log("error product", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeid}&message=error-when-try-to-insert-products`
    );
  }

  if (data !== null && data[0].id) {
    await handleInsertInventory(inventory, storeid, data[0].id);
  }
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

  // console.log("error insert inventory", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeid}&productId=${productId}&message=inventory-error`
    );
  }

  redirect(`/store/products?id=${storeid}`);
};
