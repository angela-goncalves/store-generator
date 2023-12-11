"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const user_id = "34fd397d-fd61-4653-8b6b-309d381aa8e2";

export const handleInsertStore = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // user data
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (user) {
  const siteName = formData.get("siteName") as string;
  const siteDescription = formData.get("siteDescription") as string;
  const siteLocation = formData.get("siteLocation") as string;

  const { data, error: pageErrors } = await supabase
    .from("store")
    .insert([
      {
        name: siteName,
        description: siteDescription,
        location: siteLocation,
        // user_id: user.id,
      },
    ])
    .select();

  if (pageErrors !== null) {
    redirect("/add_store?message=store error");
  }

  redirect(`/store?id=${data[0].id}`);
  // } else {
  //   redirect("/add_store?message=You-need-to-be-authenticated");
  // }
};

interface FormDataData {
  name: string;
  description: string;
  id: string;
}
export const handleInsertCollections = async (
  formData: FormDataData[],
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // user data
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const collections = formData.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      store_id: storeId,
      user_id: user_id,
    };
  });

  // if (user) {
  const { data, error: collectionsErrors } = await supabase
    .from("collections")
    .insert(collections)
    .select();

  if (collectionsErrors !== null) {
    redirect("store/collections/add-collections&message=collections errors");
  }

  redirect(`/store?id=${storeId}`);
  // } else {
  //   redirect("/add-collections&message=You need to be authenticated");
  // }
};

interface IFormDataInsertProduct {
  name: string;
  description: string;
  price: string;
  image: string;
  collectionId: string;
}

export const handleInsertProduct = async (
  formData: IFormDataInsertProduct,
  storeid: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const name = formData.name;
  const description = formData.description;
  const price = formData.price;
  const image = formData.image;
  const collection_id = formData.collectionId;
  const productAdded = [
    {
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

  if (data === null || error !== null) {
    redirect(
      `/store/products/add-products?id=${storeid}&message=products-error`
    );
  }

  redirect(`/store/products?id=${storeid}`);
};
