"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getStore = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("store").select().eq("id", id);

  if (data === null || error !== null) {
    redirect(
      `/store?id=${id}&message=something-went-wrong-trying-to-get-stores`
    );
  }
  return data;
};

export const getCollectionsOfStore = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("collections")
    .select()
    .eq("store_id", id);

  if (data === null || error !== null) {
    redirect(
      `/store?id=${id}&message=something-went-wrong-trying-to-get-collections`
    );
  }
  return data;
};

export const getCollectionById = async (id: string, storeId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("collections")
    .select()
    .eq("id", id);

  if (data === null || error !== null) {
    redirect(
      `/store/collections?id=${storeId}&message=something-went-wrong-trying-to-get-collections`
    );
  }
  return data;
};

export const getAllProductsOfStore = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("store_id", id);

  if (data === null || error !== null) {
    redirect(
      `/store?id=${id}&message=something-went-wrong-trying-to-get-products`
    );
  }
  return data;
};

export const getProductsToEdit = async (id: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("products").select().eq("id", id);

  if (data === null || error !== null) {
    redirect(
      `/store/products?id=${id}&message=something-went-wrong-trying-to-get-products`
    );
  }
  return data;
};

export const getAttributeChildren = async (
  productid: string,
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("attributeschildren")
    .select()
    .eq("product_id", productid);

  if (data === null || error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=something-went-wrong-trying-to-get-children-attributes`
    );
  }
  return data;
};

export const getAttributeParent = async (
  productid: string,
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("attributesparent")
    .select()
    .eq("product_id", productid);

  if (data === null || error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=something-went-wrong-trying-to-get-attrubute-parents`
    );
  }
  return data;
};

export const getInventory = async (productid: string, storeId: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("inventory")
    .select()
    .eq("product_id", productid);

  if (data === null || error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=something-went-wrong-trying-to-get-inventory`
    );
  }
  return data;
};
