"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const handleDeleteCollection = async (
  idcollection: string,
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("id", idcollection);

  if (error !== null) {
    redirect(
      `/store/collections?id=${storeId}&message=Something-went-wrong-when-try-to-delete`
    );
  }
  revalidatePath(`/store/collections?id=${storeId}`);
};

export const handleDeleteProduct = async (
  productId: string,
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error !== null) {
    redirect(
      `/store/products?id=${storeId}&message=Something-went-wrong-when-try-to-delete-the-product`
    );
  }

  revalidatePath(`/store/products?id=${storeId}`);
};
