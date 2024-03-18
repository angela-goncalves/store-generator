import { Database as DB } from "@/utils/supabase/types";

declare global {
  type Database = DB;

  type Attributes = DB["public"]["Tables"]["attributes"]["Row"];
  type AttributesInsert = DB["public"]["Tables"]["attributes"]["Insert"];
  type AttributesUpdate = DB["public"]["Tables"]["attributes"]["Update"];

  type Collections = DB["public"]["Tables"]["collections"]["Row"];
  type CollectionsInsert = DB["public"]["Tables"]["collections"]["Insert"];
  type CollectionsUpdate = DB["public"]["Tables"]["collections"]["Update"];

  type Inventory = DB["public"]["Tables"]["inventory"]["Row"];
  type InventoryInsert = DB["public"]["Tables"]["inventory"]["Insert"];
  type InventoryUpdate = DB["public"]["Tables"]["inventory"]["Update"];

  type Products = DB["public"]["Tables"]["products"]["Row"];
  type ProductsInsert = DB["public"]["Tables"]["products"]["Insert"];
  type ProductsUpdate = DB["public"]["Tables"]["products"]["Update"];

  type Store = DB["public"]["Tables"]["store"]["Row"];
  type StoreInsert = DB["public"]["Tables"]["store"]["Insert"];
  type StoreUpdate = DB["public"]["Tables"]["store"]["Update"];
}
