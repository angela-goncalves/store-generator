import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";

interface IProduct {
  id: string;
  created_at: string;
  description: string;
  image: string;
  name: string;
  price: string;
  store_id: string;
}

interface IShoppingCart {
  productData: IProduct;
}

export default function Component({ productData }: IShoppingCart) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="flex-1 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium">Product 1</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Color: Red, Size: M
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">$10.00</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <MinusIcon className="w-4 h-4" />
            </Button>
            <span className="text-sm">1</span>
            <Button size="icon" variant="ghost">
              <PlusIcon className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-medium">Product 2</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Color: Blue, Size: L
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">$20.00</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <MinusIcon className="w-4 h-4" />
            </Button>
            <span className="text-sm">2</span>
            <Button size="icon" variant="ghost">
              <PlusIcon className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t pt-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">Total</span>
          <span className="text-lg font-medium">$50.00</span>
        </div>
        <Button className="w-full" size="lg">
          Checkout
        </Button>
      </div>
    </div>
  );
}
