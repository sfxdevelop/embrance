import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2025-06-30.basil",
});

serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      Deno.env.get("STRIPE_WEBHOOK_SECRET"),
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const order_id = session.metadata?.order_id;

      if (!order_id) {
        throw new Error("Missing order_id in metadata");
      }

      // ✅ Update order status to 'PAID' in Supabase
      const response = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/rest/v1/orders?id=eq.${order_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({ status: "PAID" }),
        },
      );

      const result = await response.json();
      console.log("Order updated:", result);
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return new Response("Webhook error", { status: 400 });
  }
});
