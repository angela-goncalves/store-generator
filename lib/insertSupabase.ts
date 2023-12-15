"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const handleInsertStore = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const { data: sessionData, error: sessionError } =
  //   await supabase.auth.getSession();
  // const { session } = sessionData;

  // if (session === null || sessionError !== null) {
  //   redirect(`/login?signin=true`);
  // }

  const session = { user: { id: "41b622a8-0c84-468e-a9e0-8e05b3a667a1" } };

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
        user_id: session.user.id,
      },
    ])
    .select();
  if (pageErrors !== null) {
    redirect("/add_store?message=store-error");
  }

  redirect(`/store?id=${data[0].id}`);
  // } else {
  //   redirect("/add_store?message=You-need-to-be-authenticated");
  // }
};

interface FormDataData {
  name: string;
  id: string;
}
export const handleInsertCollections = async (
  formData: FormDataData[],
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const { data: sessionData, error: sessionError } =
  //   await supabase.auth.getSession();
  // const { session } = sessionData;

  // if (session === null || sessionError !== null) {
  //   redirect(`/login?signin=true`);
  // }
  const session = { user: { id: "41b622a8-0c84-468e-a9e0-8e05b3a667a1" } };

  const collections = formData.map((item) => {
    return {
      id: item.id,
      name: item.name,
      store_id: storeId,
      user_id: session.user.id,
    };
  });

  const { error: collectionsErrors } = await supabase
    .from("collections")
    .insert(collections)
    .select();

  if (collectionsErrors !== null) {
    redirect("/store/collections/add-collections&message=collections-errors");
  }

  revalidatePath(`/store/products?id=${storeId}`);
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

  // const { data: sessionData, error: sessionError } =
  //   await supabase.auth.getSession();
  // const { session } = sessionData;

  // if (session === null || sessionError !== null) {
  //   redirect(`/login?signin=true`);
  // }
  const session = { user: { id: "41b622a8-0c84-468e-a9e0-8e05b3a667a1" } };

  const name = formData.name;
  const description = formData.description;
  const price = formData.price;
  const image = formData.image;
  const collection_id =
    formData.collectionId === "" ? null : formData.collectionId;
  const productAdded = [
    {
      name,
      description,
      price: Number(price),
      image,
      collection_id,
      store_id: storeid,
      user_id: session.user.id,
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
