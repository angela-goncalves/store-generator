import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: products } = await supabase.from("products").select();

  return <pre>{JSON.stringify(products, null, 2)}</pre>;
}
