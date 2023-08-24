import ProductView from "@/app/components/ProductView";
import ReviewsList from "@/app/components/ReviewsList";
import SimilarProductsList from "@/app/components/SimilarProductsList";
import startDb from "@/app/lib/db";
import { updateOrCreateHistory } from "@/app/models/historyModel";
import ProductModel from "@/app/models/productModel";
import ReviewModel from "@/app/models/reviewModel";
import WishlistModel from "@/app/models/wishlistModel";
import { auth } from "@/auth";
import { ObjectId, isValidObjectId } from "mongoose";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    product: string[];
  };
}

const fetchProduct = async (productId: string) => {
  if (!isValidObjectId(productId)) return redirect("/404");

  await startDb();
  const product = await ProductModel.findById(productId);
  if (!product) return redirect("/404");

  let isWishlist = false;

  const session = await auth();
  if (session?.user) {
    await updateOrCreateHistory(session.user.id, product._id.toString());
    const wishlist = await WishlistModel.findOne({
      user: session.user.id,
      products: product._id,
    });
    isWishlist = wishlist ? true : false;
  }

  return JSON.stringify({
    id: product._id.toString(),
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail.url,
    images: product.images?.map(({ url }) => url),
    bulletPoints: product.bulletPoints,
    price: product.price,
    sale: product.sale,
    rating: product.rating,
    outOfStock: product.quantity <= 0,
    isWishlist,
  });
};

const fetchProductReviews = async (productId: string) => {
  await startDb();
  const reviews = await ReviewModel.find({ product: productId }).populate<{
    userId: { _id: ObjectId; name: string; avatar?: { url: string } };
  }>({
    path: "userId",
    select: "name avatar.url",
  });

  const result = reviews.map((r) => ({
    id: r._id.toString(),
    rating: r.rating,
    comment: r.comment,
    date: r.createdAt,
    userInfo: {
      id: r.userId._id.toString(),
      name: r.userId.name,
      avatar: r.userId.avatar?.url,
    },
  }));

  return JSON.stringify(result);
};

const fetchSimilarProducts = async () => {
  await startDb();
  const products = await ProductModel.find().sort({ rating: -1 }).limit(10);
  return products.map(({ _id, thumbnail, title, price }) => {
    return {
      id: _id.toString(),
      title,
      thumbnail: thumbnail.url,
      price: price.discounted,
    };
  });
};

export default async function Product({ params }: Props) {
  const { product } = params;
  const productId = product[1];
  const productInfo = JSON.parse(await fetchProduct(productId));
  let productImages = [productInfo.thumbnail];
  if (productInfo.images) {
    productImages = productImages.concat(productInfo.images);
  }

  const reviews = await fetchProductReviews(productId);
  const similarProducts = await fetchSimilarProducts();

  console.log(productInfo.wishlist);

  return (
    <div className="p-4">
      <ProductView
        title={productInfo.title}
        description={productInfo.description}
        price={productInfo.price}
        sale={productInfo.sale}
        points={productInfo.bulletPoints}
        images={productImages}
        rating={productInfo.rating}
        outOfStock={productInfo.outOfStock}
        isWishlist={productInfo.isWishlist}
      />

      <SimilarProductsList products={similarProducts} />

      <div className="py-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-2">Reviews</h1>
          <Link href={`/add-review/${productInfo.id}`}>Add Review</Link>
        </div>

        <ReviewsList reviews={JSON.parse(reviews)} />
      </div>
    </div>
  );
}
