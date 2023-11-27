import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <div className="flex gap-4 items-center">
      <Link
        href="/login?signin=true"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        Log in
      </Link>
      <Link
        href="/login?signin=false"
        className="font-bold p-3 border-none bg-emerald-700 rounded-full w-max">
        Get started
      </Link>
    </div>
  );
}
