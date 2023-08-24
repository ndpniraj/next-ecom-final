import React from "react";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import GridView from "@components/GridView";
import ProductCard from "@components/ProductCard";
import CategoryMenu from "@/app/components/CategoryMenu";

interface LatestProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: {
    base: number;
    discounted: number;
  };
  sale: number;
}

const fetchProductsByCategory = async (category: string) => {
  await startDb();
  const products = await ProductModel.find({ category })
    .sort("-createdAt")
    .limit(20);

  const productList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
    };
  });

  return JSON.stringify(productList);
};

interface Props {
  params: { category: string };
}

export default async function ProductByCategory({ params }: Props) {
  const products = await fetchProductsByCategory(
    decodeURIComponent(params.category)
  );
  const parsedProducts = JSON.parse(products) as LatestProduct[];

  return (
    <div className="py-4 space-y-4">
      <CategoryMenu />
      {parsedProducts.length ? (
        <GridView>
          {parsedProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </GridView>
      ) : (
        <h1 className="text-center pt-10 font-semibold text-2xl opacity-40">
          Sorry there are no products in this category!
        </h1>
      )}
    </div>
  );
}
