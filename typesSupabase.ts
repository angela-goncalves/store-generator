export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          name: string | null;
          store_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          store_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          store_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "collections_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "store";
            referencedColumns: ["id"];
          }
        ];
      };
      inventory: {
        Row: {
          color_id: string | null;
          created_at: string;
          id: string;
          product_id: string | null;
          size_id: string | null;
          stock_level: number | null;
        };
        Insert: {
          color_id?: string | null;
          created_at?: string;
          id?: string;
          product_id?: string | null;
          size_id?: string | null;
          stock_level?: number | null;
        };
        Update: {
          color_id?: string | null;
          created_at?: string;
          id?: string;
          product_id?: string | null;
          size_id?: string | null;
          stock_level?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "inventory_color_id_fkey";
            columns: ["color_id"];
            isOneToOne: false;
            referencedRelation: "product_color";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "inventory_size_id_fkey";
            columns: ["size_id"];
            isOneToOne: false;
            referencedRelation: "product_size";
            referencedColumns: ["id"];
          }
        ];
      };
      product_color: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      product_size: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      products: {
        Row: {
          collection_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          name: string | null;
          price: number | null;
        };
        Insert: {
          collection_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          price?: number | null;
        };
        Update: {
          collection_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_collection_id_fkey";
            columns: ["collection_id"];
            isOneToOne: false;
            referencedRelation: "collections";
            referencedColumns: ["id"];
          }
        ];
      };
      store: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          logo: string | null;
          name: string | null;
          profile_image: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id: string;
          logo?: string | null;
          name?: string | null;
          profile_image?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          logo?: string | null;
          name?: string | null;
          profile_image?: string | null;
          user_id?: string | null;
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
}
