import SideBar from "@/components/SideBar";
import React, { ReactElement } from "react";

export default function LayoutEditStore({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <div className="flex w-full justify-center">
      <SideBar />
      {children}
    </div>
  );
}
