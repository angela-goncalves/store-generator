import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { capitalizeFirstLetter } from "@/lib/uppercase";
import { updateProductInCookies } from "@/lib/action/cookies";

interface IAttributes {
  id: string;
  name: string;
  children_values: string[];
}

interface IProduct {
  productName: string;
  productId: string;
  productPrice: number;
  attributes: IAttributes[];
  noItems: number;
}

interface IShoppingBag {
  productData: IProduct;
  setproductsToBuy: (productsToBuy: IProduct[]) => void;
  productsToBuy: IProduct[];
  storeName: string;
}

export default function ShoppingBagForm({
  productData,
  setproductsToBuy,
  productsToBuy,
  storeName,
}: IShoppingBag) {
  const handleAddItems = () => {
    const sumNoItems = productsToBuy.map((item) => {
      if (item.productId === productData.productId) {
        return { ...item, noItems: item.noItems + 1 };
      }
      return item;
    });
    setproductsToBuy(sumNoItems);
    updateProductInCookies(sumNoItems);
  };

  const handleSubtractItems = () => {
    const sumNoItems = productsToBuy.map((item) => {
      if (item.productId === productData.productId) {
        return { ...item, noItems: item.noItems - 1 };
      }
      return item;
    });

    const findProductCounterZero = sumNoItems.find(
      (item) => item.noItems === 0
    );

    if (findProductCounterZero) {
      const filterProductCounterZero = sumNoItems.filter(
        (item) => item.noItems !== 0
      );
      updateProductInCookies(filterProductCounterZero);
    }

    setproductsToBuy(sumNoItems);
    updateProductInCookies(sumNoItems);
  };

  return (
    <div className="flex-1 space-y-6 my-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 items-center">
          <h3 className="text-xl font-medium">
            {capitalizeFirstLetter(productData.productName)}
          </h3>
          <div className="flex gap-2">
            {productData.attributes.map((item, index) => (
              <div key={index} className="flex gap-2">
                {item.children_values.map((ele: any) => (
                  <p key={ele}>{ele}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="font-bold">
            ${productData.productPrice * productData.noItems}
          </p>
        </div>

        <div className="flex items-center">
          <Button type="button" variant="ghost" onClick={handleSubtractItems}>
            <MinusIcon className="w-5" />
          </Button>
          <p>{productData.noItems}</p>
          <Button type="button" variant="ghost" onClick={handleAddItems}>
            <PlusIcon className="w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
