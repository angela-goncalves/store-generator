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
  handleSubmitAttributes: any;
}

export function DialogVariants({
  title,
  description,
  children,

  handleSubmitAttributes,
}: IDialogVariants) {
  return (
    <Dialog>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Variants</h3>
        <DialogTrigger asChild>
          <Button variant="outline" className="self-end bg-neutral-light">
            <Plus className="w-4 mr-2" /> New variant
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
            onClick={handleSubmitAttributes}
            className="hover:shadow-md hover:shadow-primary hover:bg-primary hover:text-primary-foreground"
            variant="default">
            Save all
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
