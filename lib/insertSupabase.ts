"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateProduct } from "./updateSupabase";
import { revalidatePath } from "next/cache";

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

interface IFormDataInsertProduct {
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
interface IAttributes {
  name: string;
  values: string[];
}
interface IAttributesChildren {
  idParent: string;
  values: string[];
  productId: string;
}
export const handleInsertProduct = async (
  product: IFormDataInsertProduct,
  storeid: string
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

  const { error } = await supabase
    .from("products")
    .insert(productAdded)
    .select();

  // console.log("error product", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeid}&message=error-when-try-to-insert-products`
    );
  }

  redirect(`/store/products?id=${storeid}`);
};

export const handleInsertAttributesParent = async (
  attributes: IAttributes[],
  productId: string,
  storeId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const lastAttribute = attributes.slice(-1);

  const attributesName = lastAttribute.map((item) => {
    return {
      name: item.name,
      product_id: productId,
    };
  });
  const { data, error } = await supabase
    .from("attributesparent")
    .insert(attributesName)
    .select();

  // console.log("error attributesparent", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&message=error-when-try-to-insert-variantParents`
    );
  }

  if (data[0].id) {
    const attributesChildren = lastAttribute.map((item) => {
      return {
        idParent: data[0].id,
        values: item.values,
        productId,
      };
    });

    await handleInsertVariantsChildren(attributesChildren, storeId, productId);
  }

  // revalidatePath(
  //   `/store/products/add-products?id=${storeId}&productId=${productId}`
  // );
};

const handleInsertVariantsChildren = async (
  attributesChildren: IAttributesChildren[],
  storeId: string,
  productId: string
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const lastAttribute = attributesChildren.pop();

  const attributeChildren = lastAttribute?.values.map((child) => {
    return {
      attributeparent_id: lastAttribute.idParent,
      name: child,
      product_id: lastAttribute.productId,
    };
  });
  const { error } = await supabase
    .from("attributeschildren")
    .insert(attributeChildren)
    .select();

  // console.log("error inserting variants children", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeId}&productId=${productId}&message=error-when-try-to-insert-variant-children`
    );
  }
  revalidatePath(
    `/store/products/add-products?id=${storeId}&productId=${productId}`
  );
};

export const handleInsertInventory = async (
  formData: IFormDataInsertProduct,
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
      attributeschildren_id: item.combination,
      price: Number(item.price) ?? 0,
      stock_level: Number(item.stock) ?? 0,
    };
  });

  const { error } = await supabase.from("inventory").insert(inventory).select();

  // console.log("error", error);

  if (error !== null) {
    redirect(
      `/store/products/add-products?id=${storeid}&productId=${productId}&message=inventory-error`
    );
  }
  await updateProduct(formData, storeid);
};
