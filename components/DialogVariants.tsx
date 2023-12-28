import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
}

export function DialogVariants({
  title,
  description,
  children,
  onClick,
}: IDialogVariants) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-end" onClick={onClick}>
          New variant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex-col flex">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
