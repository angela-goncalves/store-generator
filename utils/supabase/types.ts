export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      attributes: {
        Row: {
          children_values: string[];
          created_at: string;
          id: string;
          name: string | null;
          product_id: string | null;
        };
        Insert: {
          children_values: string[];
          created_at?: string;
          id?: string;
          name?: string | null;
          product_id?: string | null;
        };
        Update: {
          children_values?: string[];
          created_at?: string;
          id?: string;
          name?: string | null;
          product_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "attributes_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      collections: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          name: string | null;
          store_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          store_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          store_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "collections_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "store";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "collections_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      inventory: {
        Row: {
          attributeschildren: string | null;
          created_at: string;
          id: string;
          price: number | null;
          product_id: string | null;
          stock_level: number | null;
        };
        Insert: {
          attributeschildren?: string | null;
          created_at?: string;
          id?: string;
          price?: number | null;
          product_id?: string | null;
          stock_level?: number | null;
        };
        Update: {
          attributeschildren?: string | null;
          created_at?: string;
          id?: string;
          price?: number | null;
          product_id?: string | null;
          stock_level?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_inventory_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          collection_id: string | null;
          created_at: string;
          description: string | null;
          extrainfo: string | null;
          id: string;
          images: string[] | null;
          name: string | null;
          price: number | null;
          store_id: string | null;
          url: string | null;
        };
        Insert: {
          collection_id?: string | null;
          created_at?: string;
          description?: string | null;
          extrainfo?: string | null;
          id?: string;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          store_id?: string | null;
          url?: string | null;
        };
        Update: {
          collection_id?: string | null;
          created_at?: string;
          description?: string | null;
          extrainfo?: string | null;
          id?: string;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          store_id?: string | null;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_collection_id_fkey";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "collections";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "store";
            referencedColumns: ["id"];
          }
        ];
      };
      store: {
        Row: {
          contact_mail: string | null;
          created_at: string;
          description: string | null;
          id: string;
          location: string | null;
          logo: string | null;
          name: string | null;
          phone: string | null;
          social_media: Json[] | null;
          user_id: string | null;
          whatsapp: string | null;
        };
        Insert: {
          contact_mail?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: string | null;
          logo?: string | null;
          name?: string | null;
          phone?: string | null;
          social_media?: Json[] | null;
          user_id?: string | null;
          whatsapp?: string | null;
        };
        Update: {
          contact_mail?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          location?: string | null;
          logo?: string | null;
          name?: string | null;
          phone?: string | null;
          social_media?: Json[] | null;
          user_id?: string | null;
          whatsapp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "store_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
