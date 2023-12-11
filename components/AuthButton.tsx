import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ConfigMenu } from "./ConfigMenu";

export default async function AuthButton() {
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const user = true;

  return user ? (
    <div className="flex items-center gap-4">
      {/* Welcome back, {user.email}! */}
      <ConfigMenu />
    </div>
  ) : (
    <div className="flex gap-4 items-center">
      <Link
        href="/login?signin=true"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Log in
      </Link>
    </div>
  );
}
