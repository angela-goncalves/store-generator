import SideBar from "@/components/SideBar";
import React, { ReactElement } from "react";
import NavBar from "@/components/NavBar";

export default function LayoutEditStore({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <div className="flex flex-col w-full justify-center">
      <NavBar />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
