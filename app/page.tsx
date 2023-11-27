import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // user's data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full border-b border-b-foreground/10 max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/">store-generator</Link>
        <AuthButton />
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <Link href="/add_store">Add store</Link>
        <main className="flex-1 flex flex-col gap-6 items-center">
          <Link
            href="/login?signup"
            className="font-bold text-2xl mb-4 p-4 border-none bg-emerald-700 rounded-full w-max">
            Get started
          </Link>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer">
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
