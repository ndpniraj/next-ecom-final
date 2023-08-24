import WishlistProductCard from "@/app/components/WishlistProductCard";
import WishlistModel from "@/app/models/wishlistModel";
import { auth } from "@/auth";
import { ObjectId } from "mongoose";
import { redirect } from "next/navigation";
import React from "react";

const fetchProducts = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/404");

  const wishlist = await WishlistModel.findOne<{
    products: [
      {
        _id: ObjectId;
        title: string;
        thumbnail: { url: string };
        price: { discounted: number };
      }
    ];
  }>({
    user: session.user.id,
  }).populate({
    path: "products",
    select: "title thumbnail.url price.discounted",
  });

  if (!wishlist) return [];

  return wishlist?.products.map(({ _id, title, price, thumbnail }) => {
    return {
      id: _id.toString(),
      title,
      price: price.discounted,
      thumbnail: thumbnail.url,
    };
  });
};

export default async function Wishlist() {
  const products = await fetchProducts();

  if (!products.length)
    return (
      <h1 className="text-2xl opacity-50 text-center p-6 font-semibold">
        There is no products inside your wishlist.
      </h1>
    );

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-semibold">Your Wishlist</h1>
      {products.map((product) => {
        return <WishlistProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}
