import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2025-06-30.basil",
});

serve(async (req) => {
  try {
    const { order } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: order.name,
              description: order.description,
            },
            unit_amount: Math.round(order.total * 100), // convert to cents
          },
          quantity: order.quantity || 1,
        },
      ],
      success_url: `${order.returnUrl}?success=true`,
      cancel_url: `${order.returnUrl}?canceled=true`,
      metadata: {
        order_id: order.order_id,
        profile_id: order.profile_id,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Stripe error", error);
    return new Response(JSON.stringify({ error: "Failed to create session" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
