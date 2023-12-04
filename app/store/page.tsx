import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// export async function generateStaticParams() {
//   const posts = await fetch("https://.../posts").then((res) => res.json());

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default async function Store({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // console.log("searchParams in store page", searchParams.id);
  const { data: dataStore, error: storeError } = await supabase
    .from("store")
    .select()
    .eq("id", searchParams.id);

  const { data: dataCollections, error: collectionsError } = await supabase
    .from("collections")
    .select()
    .eq("store_id", searchParams.id);

  const { data: dataProducts, error: productsError } = await supabase
    .from("products")
    .select();
  // .eq("collection_id", dataCollections.id);
  if (dataStore === null || storeError !== null || dataStore === undefined) {
    redirect(`/store?id=${searchParams.id}&message=Store-error`);
  }
  if (dataProducts === null || productsError !== null) {
    redirect(`/store?id=${searchParams.id}&message=products-error`);
  }
  if (dataCollections === null || collectionsError !== null) {
    redirect(`/store?id=${searchParams.id}&message=collections-error[id]`);
  }

  return (
    <div className="flex flex-col w-full items-center">
      {dataStore.length > 0 ? (
        <div>
          <div className="border-gray-600 border rounded-full w-max p-4 m-6">
            <h1 className="text-3xl">{dataStore[0].name}</h1>
          </div>
          <h3 className="text-2xl">{dataStore[0].description}</h3>
        </div>
      ) : (
        <div>
          <div className="border-gray-600 border rounded-full w-max p-4 m-6">
            <h1>new store</h1>
          </div>
          <h3 className="text-2xl">New description</h3>
        </div>
      )}
      {dataCollections.length > 0 ? (
        <div className="flex justify-around">
          {dataCollections.map((item) => (
            <div key={item.id} className="border border-gray-500 rounded-lg">
              {item.name}
            </div>
          ))}
        </div>
      ) : (
        <h3>Temporary collections list</h3>
      )}
      {dataProducts.length > 0 ? (
        <div className="flex justify-around">
          {dataProducts.map((item) => (
            <div key={item.id}>
              <h3>Name: {item.name}</h3>
              <h3>Description: {item.description}</h3>
            </div>
          ))}
        </div>
      ) : (
        <h3>temporary image of prducts</h3>
      )}
    </div>
  );
}
