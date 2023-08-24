import { getCartItems } from "@/app/lib/cartHelper";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const POST = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user)
      return NextResponse.json(
        {
          error: "Unauthorized request!",
        },
        { status: 401 }
      );

    const data = await req.json();
    const cartId = data.cartId as string;

    if (!isValidObjectId(cartId))
      return NextResponse.json(
        {
          error: "Invalid cart id!",
        },
        { status: 401 }
      );

    // fetching cart details
    const cartItems = await getCartItems(session.user.id, cartId);
    if (!cartItems)
      return NextResponse.json(
        {
          error: "Cart not found!",
        },
        { status: 404 }
      );

    const line_items = cartItems.products.map((product) => {
      return {
        price_data: {
          currency: "INR",
          unit_amount: product.price * 100,
          product_data: {
            name: product.title,
            images: [product.thumbnail],
          },
        },
        quantity: product.qty,
      };
    });

    const customer = await stripe.customers.create({
      metadata: {
        userId: session.user.id,
        cartId: cartId,
        type: "checkout",
      },
    });

    // we need to generate payment link and send to our frontend app
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: process.env.PAYMENT_SUCCESS_URL!,
      cancel_url: process.env.PAYMENT_CANCEL_URL!,
      shipping_address_collection: { allowed_countries: ["IN"] },
      customer: customer.id,
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong, could not checkout!" },
      { status: 500 }
    );
  }
};
