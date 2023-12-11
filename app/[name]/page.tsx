import TemplateComponent from "@/components/store";
import React from "react";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TheStore({
  params,
}: {
  params: { name: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error: storeError } = await supabase
    .from("store")
    .select()
    .eq("name", params.name);

  if (data === null || storeError !== null) {
    redirect(
      `/${params.name}?message=Something-went-wrong-with-${params.name}`
    );
  }

  if (data.length === 0) {
    return <div>Sorry your page is not found</div>;
  }
  return (
    <div className="flex-1 flex flex-col justify-between">
      <TemplateComponent storeId={data ? data[0].id : ""} />
      <footer className="w-full py-4 bg-white flex flex-col">
        <div className="self-end text-neutral-medium p-4 ">
          <p>Built with Next.js, Tailwind and Vercel</p>
          <Link href="https://github.com/angela-goncalves">by Angela</Link>
        </div>
      </footer>
    </div>
  );
}
