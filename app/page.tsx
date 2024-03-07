import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import { Copyright, Plus } from "lucide-react";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getSession();
  const { session } = data;

  if (session === null || error !== null) {
    return (
      <div className="flex-1 w-full flex flex-col items-center min-h-screen">
        <div className="bg-secondary animate-in opacity-0 self-center flex-1 w-full text-secondary-foreground flex flex-col items-center">
          <NavBar user="" />
          <div className="animate-in opacity-0 w-full flex-1 flex flex-col h-full items-center gap-6 max-w-4xl">
            <Header usermail="" />
            <Link
              href="/login?signup"
              className="font-bold text-2xl p-4 border-none bg-primary text-primary-foreground rounded-lg w-max">
              Get started!
            </Link>
          </div>
        </div>
        <footer className="w-full bg-neutral-medium text-neutral-foreground flex justify-center text-center text-xs py-6">
          <div className="self-end p-4">
            <p>Built with Next.js, Tailwind, Supabase and Vercel</p>
            <Link href="https://github.com/angela-goncalves">by Angela</Link>
          </div>
        </footer>
      </div>
    );
  }

  const { data: dataStore, error: storeError } = await supabase
    .from("store")
    .select("*")
    .eq("user_id", session.user.id);

  if (dataStore === null || storeError !== null) {
    redirect("/&massage=something-went-wrong");
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between min-h-screen">
      <NavBar user={session.user.id} />
      {session.user.id && (
        <div className="animate-in opacity-0 self-center flex-1 w-full text-primary-foreground flex flex-col items-center mt-10">
          <h2>Welcome to EcomPalace.store!</h2>
          {dataStore.length > 0 ? (
            <div className=" text-center w-full max-w-[800px]  flex flex-col gap-10 ">
              <Link
                href={`/add-store`}
                className="p-2 flex items-center gap-2 border border-neutral-dark text-primary-foreground rounded-lg w-max self-end hover:bg-neutral-light hover:text-secondary">
                <Plus className="w-4" />
                <p className="text-sm">New store</p>
              </Link>
              <div className=" p-10  flex flex-col m-4 gap-8 justify-center items-center">
                <h1 className="text-3xl">
                  Which one are you working on today?
                </h1>
                <div className="flex gap-4">
                  {dataStore.map((item) => (
                    <Link href={`/store?id=${item.id}`} key={item.id}>
                      <div className="h-32 w-44 p-4 text-lg text-center bg-white shadow-sm hover:shadow-xl rounded-lg ">
                        <h3>{item.name}</h3>
                        <h3 className="text-sm">http:{item.name}.com</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in opacity-0 w-full flex-1 flex flex-col items-center gap-6 max-w-4xl px-3">
              <Header usermail={session.user.email ? session.user.email : ""} />
              <Link
                href={`/add-store`}
                className="text-2xl p-4 border-none bg-primary text-primary-foreground rounded-lg w-max">
                Let's create your new store!
              </Link>
            </div>
          )}
        </div>
      )}

      <footer className="w-full bg-footer text-neutral-foreground flex justify-around text-center text-xs py-6">
        <div className="text-neutral-medium p-4 flex gap-4 items-center">
          <Copyright className="w-4" />
          2023 EcomPalace.store
        </div>
      </footer>
    </div>
  );
}
