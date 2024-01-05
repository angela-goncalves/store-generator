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

interface IDialogVariants {
  title: string;
  description?: string;
  children: ReactElement;
  onClick: () => void;
  handleSubmitAttributes: any;
}

export function DialogVariants({
  title,
  description,
  children,
  onClick,

  handleSubmitAttributes,
}: IDialogVariants) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-end" onClick={onClick}>
          New variant
        </Button>
      </DialogTrigger>
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
