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
      <DialogContent className="sm:max-w-[425px] flex-col flex h-full overflow-scroll">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogClose asChild>
          <Button
            type="button"
            onClick={handleSubmitAttributes}
            className="self-end hover:shadow-md hover:shadow-secondary hover:bg-secondary hover:text-secondary-foreground bg-secondary text-secondary-foreground">
            Save
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
