"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UUID } from "crypto";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export const getStore = async (id: UUID) => {
  //   console.log("id in getStore", id);

  const { data, error } = await supabase.from("store").select().eq("id", id);
  //   console.log("data getStore", data);

  if (data === null || error !== null) {
    redirect(
      `/store?id=${id}&message=something-went-wrong-with-stores-in-sidebar`
    );
  }
  return data;
};

export const getCollections = async (id: UUID) => {
  const { data: dataCollections, error: collectionsError } = await supabase
    .from("collections")
    .select()
    .eq("store_id", id);
  if (dataCollections === null || collectionsError !== null) {
    redirect(`/store?id=${id}/collections&message=collections-error`);
  }
  return dataCollections;
};

export const getProducts = async (id: UUID) => {
  const { data: dataProducts, error: productsError } = await supabase
    .from("products")
    .select();

  if (dataProducts === null || productsError !== null) {
    redirect(`/store?id=${id}/&message=products-error`);
  }
  return dataProducts;
};
