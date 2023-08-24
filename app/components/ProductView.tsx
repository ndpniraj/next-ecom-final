import React from "react";
import BuyingOptions from "@components/BuyingOptions";
import { formatPrice } from "../utils/helper";
import ProductImageGallery from "@components/ProductImageGallery";
import Rating from "./Rating";

interface Props {
  title: string;
  description: string;
  images: string[];
  points?: string[];
  price: { base: number; discounted: number };
  sale: number;
  rating: number;
  outOfStock: boolean;
  isWishlist?: boolean;
}

export default function ProductView({
  description,
  images,
  title,
  points,
  price,
  sale,
  rating,
  outOfStock,
  isWishlist,
}: Props) {
  return (
    <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
      <div className="flex-1 lg:self-start self-center relative">
        {/* Product Image Slider */}
        <ProductImageGallery images={images} />
      </div>

      <div className="flex-1 md:space-y-4 space-y-2">
        <h1 className="md:text-3xl text-xl font-semibold">{title}</h1>
        <p>{description}</p>

        <div className="pl-4 space-y-2">
          {points?.map((point, index) => {
            return <li key={index}>{point}</li>;
          })}
        </div>

        {rating ? <Rating value={parseFloat(rating.toFixed(1))} /> : null}

        <div className="flex items-center space-x-2 mb-2">
          <p className="line-through text-xl">{formatPrice(price.base)}</p>
          <p className="font-semibold text-xl">
            {formatPrice(price.discounted)}
          </p>
          <p className="font-bold uppercase whitespace-nowrap select-none bg-red-500 text-white py-1.5 px-3 text-xs rounded-lg">
            {`${sale}% off`}
          </p>
        </div>

        <div className="flex py-4">
          {outOfStock ? (
            <div className="uppercase text-gray-700">Out of stock</div>
          ) : (
            <BuyingOptions wishlist={isWishlist} />
          )}
        </div>
      </div>
    </div>
  );
}
