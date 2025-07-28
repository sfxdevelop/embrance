import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface OrderItem {
  order_id: string;
  product_id: string;
  product_type_id: string;
  product_format_id: string;
  product_size_id: string;
  product_finish_id: string;
  product_theme_id: string;
  quantity: number;
  total: number;
  metadata: {
    fullName: string;
    dob?: string;
    dop?: string;
    dom: string;
    photos: string[];
    text: string;
    productName: string;
    productImage: string;
  };
}

interface CreateOrderRequest {
  email: string;
  formData: {
    memorialInfo: {
      fullName: string;
      dob?: string;
      dop?: string;
      dom: string;
      photos: string[]; // URLs from uploaded photos
    };
    memorialKit: {
      cartItems: Array<{
        id: string;
        productId: string;
        productName: string;
        productImage: string;
        quantity: number;
        totalPrice: number;
        text: string;
        size?: { id: string };
        finish?: { id: string };
      }>;
    };
    theme: {
      selectedThemeId: string;
    };
    format: {
      selectedFormatId: string;
    };
  };
}

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { email, formData }: CreateOrderRequest = await req.json();

    // Calculate total order amount
    const orderTotal = formData.memorialKit.cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );

    // Create the order first
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        email,
        status: "PENDING",
        total: orderTotal,
        metadata: {
          selectedThemeId: formData.theme.selectedThemeId,
          selectedFormatId: formData.format.selectedFormatId,
        },
      })
      .select("*")
      .single();

    if (orderError) throw orderError;

    // Get product details for each cart item
    const orderItemsData: Omit<
      OrderItem,
      "id" | "created_at" | "updated_at"
    >[] = [];

    for (const cartItem of formData.memorialKit.cartItems) {
      const { data: product, error: productError } = await supabaseClient
        .from("products")
        .select("product_type_id")
        .eq("id", cartItem.productId)
        .single();

      if (productError) throw productError;

      orderItemsData.push({
        order_id: order.id,
        product_id: cartItem.productId,
        product_type_id: product.product_type_id,
        product_format_id: formData.format.selectedFormatId,
        product_size_id: cartItem.size?.id || "",
        product_finish_id: cartItem.finish?.id || "",
        product_theme_id: formData.theme.selectedThemeId,
        quantity: cartItem.quantity,
        total: cartItem.totalPrice,
        metadata: {
          fullName: formData.memorialInfo.fullName,
          dob: formData.memorialInfo.dob,
          dop: formData.memorialInfo.dop,
          dom: formData.memorialInfo.dom,
          photos: formData.memorialInfo.photos,
          text: cartItem.text,
          productName: cartItem.productName,
          productImage: cartItem.productImage,
        },
      });
    }

    // Create order items
    const { data: orderItems, error: orderItemsError } = await supabaseClient
      .from("order_items")
      .insert(orderItemsData)
      .select("*");

    if (orderItemsError) throw orderItemsError;

    return new Response(JSON.stringify({ order, orderItems }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-order' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
