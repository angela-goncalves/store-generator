import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface IDialogVariants {
  title: string;
  description?: string;
  children: ReactElement;
  inventoryList: boolean;
  generateVariants: () => void;
}

export function DialogVariants({
  title,
  description,
  children,
  inventoryList,
  generateVariants,
}: IDialogVariants) {
  return (
    <Dialog>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Variants</h3>
        <DialogTrigger
          asChild
          className="dark:text-black dark:bg-secondary self-end border-none">
          <Button variant="outline" type="button">
            <Plus className="w-4 mr-2" />{" "}
            <p>{inventoryList ? "Edit variants" : "New variant"}</p>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px] flex-col flex h-full overflow-scroll flex-1 justify-between">
        <div>
          <DialogHeader>
            <DialogTitle className="mb-4">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </div>
        <DialogClose asChild>
          <Button
            type="button"
            onClick={generateVariants}
            className="hover:shadow-md hover:shadow-primary hover:bg-primary hover:text-primary-foreground"
            variant="default">
            Save all
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
