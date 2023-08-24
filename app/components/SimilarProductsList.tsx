import React from "react";
import HorizontalMenu from "./HorizontalMenu";
import Image from "next/image";
import { formatPrice } from "@utils/helper";
import Link from "next/link";

interface Props {
  products: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
  }[];
}

export default function SimilarProductsList({ products }: Props) {
  return (
    <div className="py-6 w-full">
      <h1 className="font-semibold text-lg mb-4 text-blue-gray-600">
        Also you may like
      </h1>
      <HorizontalMenu>
        {products.map((product) => {
          return (
            <Link href={`/${product.title}/${product.id}`} key={product.id}>
              <div className="w-[200px] space-y-2 mr-4">
                <Image
                  width={200}
                  height={200}
                  src={product.thumbnail}
                  alt={product.title}
                  className="rounded"
                />
                <div>
                  <h2 className="text-sm line-clamp-3">{product.title}</h2>
                  <h2>{formatPrice(product.price)}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </HorizontalMenu>
    </div>
  );
}
