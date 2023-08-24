import ProductTable, { Product } from "@/app/components/ProductTable";
import startDb from "@/app/lib/db";
import ProductModel from "@/app/models/productModel";
import { redirect } from "next/navigation";
import React from "react";

const fetchProducts = async (
  pageNo: number,
  perPage: number
): Promise<Product[]> => {
  const skipCount = (pageNo - 1) * perPage;

  await startDb();
  const products = await ProductModel.find()
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      thumbnail: product.thumbnail.url,
      description: product.description,
      price: {
        mrp: product.price.base,
        salePrice: product.price.discounted,
        saleOff: product.sale,
      },
      category: product.category,
      quantity: product.quantity,
    };
  });
};

const PRODUCTS_PER_PAGE = 10;

interface Props {
  searchParams: { page: string };
}

export default async function Products({ searchParams }: Props) {
  const { page = "1" } = searchParams;

  if (isNaN(+page)) return redirect("/404");

  const products = await fetchProducts(+page, PRODUCTS_PER_PAGE);
  let hasMore = true;

  if (products.length < PRODUCTS_PER_PAGE) hasMore = false;
  else hasMore = true;

  return (
    <div>
      <ProductTable
        products={products}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
}
