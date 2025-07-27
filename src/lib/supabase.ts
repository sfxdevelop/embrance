import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database Types
export interface ProductType {
  id: string;
  media_refs: string[];
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFormat {
  id: string;
  media_refs: string[];
  name: string;
  description: string;
  features: string[];
  cta_text: string;
  footer_text: string;
  created_at: string;
  updated_at: string;
}

export interface ProductSize {
  id: string;
  width: number;
  height: number;
  label?: string;
  price_adjustment: number;
  created_at: string;
  updated_at: string;
}

export interface ProductFinish {
  id: string;
  media_refs: string[];
  name: string;
  description: string;
  price_adjustment: number;
  created_at: string;
  updated_at: string;
}

export interface ProductTheme {
  id: string;
  media_refs: string[];
  name: string;
  description: string;
  price_adjustment: number;
  created_at: string;
  updated_at: string;
}

export interface PresetText {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  media_refs: string[];
  name: string;
  description: string;
  price: number;
  product_type_id: string;
  created_at: string;
  updated_at: string;
  // Relations
  product_type?: ProductType;
  product_formats?: ProductFormat[];
  product_sizes?: ProductSize[];
  product_finishes?: ProductFinish[];
  product_themes?: ProductTheme[];
  preset_texts?: PresetText[];
}

export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "COMPLETED";

export interface OrderItem {
  id: string;
  status: OrderStatus;
  metadata: Record<string, unknown>;
  quantity: number;
  total: number;
  profile_id: string;
  product_id: string;
  product_format_id: string;
  product_size_id: string;
  product_finish_id: string;
  product_theme_id: string;
  created_at: string;
  updated_at: string;
}

// API Functions
export const api = {
  // Product Types
  async getProductTypes(): Promise<ProductType[]> {
    const { data, error } = await supabase
      .from("product_types")
      .select("*")
      .order("name");

    if (error) throw error;
    return data || [];
  },

  // Products by Type
  async getProductsByType(typeId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_type:product_types(*)
      `)
      .eq("product_type_id", typeId)
      .order("name");

    if (error) throw error;
    return data || [];
  },

  // Product with all relations
  async getProductWithOptions(productId: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_type:product_types(*),
        product_formats:product_product_formats(product_format:product_formats(*)),
        product_sizes:product_product_sizes(product_size:product_sizes(*)),
        product_finishes:product_product_finishes(product_finish:product_finishes(*)),
        product_themes:product_product_themes(product_theme:product_themes(*)),
        preset_texts:product_preset_texts(preset_text:preset_texts(*))
      `)
      .eq("id", productId)
      .single();

    if (error) throw error;

    // Transform the data to flatten the relations
    if (data) {
      return {
        ...data,
        product_formats:
          data.product_formats?.map(
            (pf: { product_format: ProductFormat }) => pf.product_format,
          ) || [],
        product_sizes:
          data.product_sizes?.map(
            (ps: { product_size: ProductSize }) => ps.product_size,
          ) || [],
        product_finishes:
          data.product_finishes?.map(
            (pf: { product_finish: ProductFinish }) => pf.product_finish,
          ) || [],
        product_themes:
          data.product_themes?.map(
            (pt: { product_theme: ProductTheme }) => pt.product_theme,
          ) || [],
        preset_texts:
          data.preset_texts?.map(
            (pt: { preset_text: PresetText }) => pt.preset_text,
          ) || [],
      };
    }

    return null;
  },

  // Themes
  async getThemes(): Promise<ProductTheme[]> {
    const { data, error } = await supabase
      .from("product_themes")
      .select("*")
      .order("name");

    if (error) throw error;
    return data || [];
  },

  // Formats
  async getFormats(): Promise<ProductFormat[]> {
    const { data, error } = await supabase
      .from("product_formats")
      .select("*")
      .order("name");

    if (error) throw error;
    return data || [];
  },

  // Create Order Items
  async createOrderItems(
    orderItems: Omit<OrderItem, "id" | "created_at" | "updated_at">[],
  ): Promise<OrderItem[]> {
    const { data, error } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select("*");

    if (error) throw error;
    return data || [];
  },
};

// Types for order processing
interface PhotoData {
  id: string;
  preview?: string;
}

interface CartItemData {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  totalPrice: number;
  customText?: string;
  presetTextId?: string;
  size?: { id: string };
  finish?: { id: string };
}

interface FormSubmissionData {
  memorialInfo: {
    fullName: string;
    dob?: Date;
    dop?: Date;
    dom: Date;
    photos?: PhotoData[];
  };
  memorialKit: {
    cartItems: CartItemData[];
  };
  theme: {
    selectedThemeId: string;
  };
  format: {
    selectedFormatId: string;
  };
}

// Order Processing Functions
export const orderProcessing = {
  // Process complete form data and create order items
  async processFormSubmission(
    formData: FormSubmissionData,
    profileId: string,
  ): Promise<OrderItem[]> {
    const { memorialInfo, memorialKit, theme, format } = formData;

    // Create metadata object with memorial info and custom text
    const baseMetadata = {
      fullName: memorialInfo.fullName,
      dob: memorialInfo.dob ? memorialInfo.dob.toISOString() : null,
      dop: memorialInfo.dop ? memorialInfo.dop.toISOString() : null,
      dom: memorialInfo.dom.toISOString(),
      photos:
        memorialInfo.photos?.map((photo: PhotoData) => ({
          id: photo.id,
          preview: photo.preview,
        })) || [],
    };

    // Map cart items to order items
    const orderItems = memorialKit.cartItems.map((cartItem: CartItemData) => {
      // Create item-specific metadata including custom text
      const itemMetadata = {
        ...baseMetadata,
        customText: cartItem.customText || null,
        presetTextId: cartItem.presetTextId || null,
        productName: cartItem.productName,
        productImage: cartItem.productImage,
      };

      return {
        status: "PENDING" as OrderStatus,
        metadata: itemMetadata,
        quantity: cartItem.quantity,
        total: cartItem.totalPrice,
        profile_id: profileId,
        product_id: cartItem.productId,
        product_format_id: format.selectedFormatId,
        product_size_id: cartItem.size?.id || "",
        product_finish_id: cartItem.finish?.id || "",
        product_theme_id: theme.selectedThemeId,
      };
    });

    // Create order items in database
    return await api.createOrderItems(orderItems);
  },
};
