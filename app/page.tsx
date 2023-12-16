import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const { data, error } = await supabase.auth.getSession();

  // const { session } = data;
  // if (session === null || error !== null) {
  //   redirect(`/login?signin=true`);
  // }
  const session = {
    user: {
      id: "41b622a8-0c84-468e-a9e0-8e05b3a667a1",
      email: "angelakgo20@gmail.com",
    },
  };

  const { data: dataStore, error: storeError } = await supabase
    .from("store")
    .select("*")
    .eq("user_id", session.user.id);

  if (dataStore === null || storeError !== null) {
    redirect("/&massage=something-went-wrong");
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between min-h-screen">
      <div className="self-end mr-20 my-20 flex flex-col justify-between items-center">
        <AuthButton user={session.user.id} />
      </div>
      {session.user.id ? (
        <div className="animate-in opacity-0 self-center flex-1 w-full text-primary-foreground flex flex-col items-center">
          {dataStore.length > 0 ? (
            <div className="bg-white text-center rounded-lg w-full max-w-[500px] p-10">
              <div className="flex m-4 gap-3 justify-center">
                <h1 className="text-2xl">
                  Which one are you working on today?
                </h1>
                {dataStore.map((item) => (
                  <Link href={`/store?id=${item.id}`} key={item.id}>
                    <div className="h-32 w-44 p-4 rounded-lg border-secondary border text-center">
                      <h3 className="">{item.name}</h3>
                      <h3 className="text-sm">http:{item.name}.com</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in opacity-0 w-full flex-1 flex flex-col items-center gap-6 max-w-4xl px-3">
              <Header usermail={session.user.email} />
              <Link
                href={`/add_store`}
                className="text-2xl p-4 border-none bg-primary text-primary-foreground rounded-lg w-max">
                Let's create your new store!
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in opacity-0 self-center flex-1 gap-6 w-full text-primary-foreground flex flex-col items-center">
          <Header usermail="" />
          <Link
            href="/login?signup"
            className="font-bold text-2xl p-4 border-none bg-primary text-primary-foreground rounded-lg w-max">
            Get started
          </Link>
        </div>
      )}
      <footer className="w-full border-t border-t-foreground/10 flex justify-center text-center text-xs py-6">
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
