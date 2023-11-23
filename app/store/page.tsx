import NavBar from "@/components/NavBar";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Store() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const { data: products } = await supabase.from("products").select();
  const { data: dataStore, error: storeError } = await supabase
    .from("store")
    .select();

  const { data: dataProducts, error: productsError } = await supabase
    .from("products")
    .select();
  const { data: dataCollections, error: collectionsError } = await supabase
    .from("collections")
    .select();

  if (dataStore === null || storeError !== null) {
    redirect("/store?message=Something went wrong with the store");
  }
  if (dataProducts === null || productsError !== null) {
    redirect("/store?message=Something went wrong with the list of products");
  }
  if (dataCollections === null || collectionsError !== null) {
    redirect("/collections?message=collections error");
  }

  return (
    <div className="flex w-screen">
      <NavBar />
      <div>
        {dataStore.map((item) => (
          <div key={item.id}>
            <div className="border-gray-600 border rounded-full w-max p-4 m-6">
              <h1 className="text-3xl">{item.name}</h1>
            </div>
            <h3 className="text-2xl">{item.description}</h3>
          </div>
        ))}
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
    </div>
  );
}
