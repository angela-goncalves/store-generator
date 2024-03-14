"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface IProductInCookies {
  productName: string;
  productId: string;
  productPrice: number;
  attributes: IAttributes[];
  noItems: number;
}
interface IProduct {
  id: string;
  created_at: string;
  description: string;
  images: string[];
  name: string;
  price: string;
  store_id: string;
}

interface IAttributes {
  id: string;
  name: string;
  children_values: string[];
}

interface IProductFromShoppingBag {
  productName: string;
  productId: string;
  productPrice: number;
  attributes: IAttributes[];
  noItems: number;
}

const getCookies = () => {
  const bag = cookies().get("products");
  try {
    return bag ? JSON.parse(bag.value) : [];
  } catch (error) {
    console.error("Error parsing JSON from cookie:", error);
    return []; // Fallback to an empty array if parsing fails
  }
};

export async function onSubmitProductToShoppingBag(
  formData: IAttributes[],
  productData: Products,
  itemsCount: number,
  storeName: string
) {
  const bag = getCookies() || [];

  const attributes = formData.map((item) => {
    return {
      name: item.name,
      children_values: item.children_values,
    };
  });

  const productsToAdd = {
    productName: productData.name,
    productId: productData.id,
    productPrice: productData.price,
    attributes,
    noItems: itemsCount,
  };

  bag.push(productsToAdd);

  cookies().set("products", JSON.stringify(bag));

  revalidatePath(`/${storeName}`, "layout");
}

export async function saveProductsFromShoppingBag(
  productData: IProductFromShoppingBag[]
) {
  const filterProductCounterZero = productData.filter(
    (item) => item.noItems !== 0
  );

  cookies().set("products", JSON.stringify(filterProductCounterZero));
}

export const updateProductInCookies = (
  productData: IProductFromShoppingBag[]
) => {
  cookies().set("products", JSON.stringify(productData));
};
