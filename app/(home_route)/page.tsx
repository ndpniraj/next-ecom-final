import React from "react";
import startDb from "@lib/db";
import ProductModel from "@models/productModel";
import GridView from "@components/GridView";
import ProductCard from "@components/ProductCard";
import FeaturedProductsSlider from "@components/FeaturedProductsSlider";
import FeaturedProductModel from "@models/featuredProduct";
import CategoryMenu from "@components/CategoryMenu";

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

const fetchLatestProducts = async () => {
  await startDb();
  const products = await ProductModel.find().sort("-createdAt").limit(20);

  const productList = products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      thumbnail: product.thumbnail.url,
      price: product.price,
      sale: product.sale,
      rating: product.rating,
    };
  });

  return JSON.stringify(productList);
};

const fetchFeaturedProducts = async () => {
  await startDb();
  const products = await FeaturedProductModel.find().sort("-createdAt");

  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      banner: product.banner.url,
      link: product.link,
      linkTitle: product.linkTitle,
    };
  });
};

export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const parsedProducts = JSON.parse(latestProducts) as LatestProduct[];
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div className="py-4 space-y-4">
      <FeaturedProductsSlider products={featuredProducts} />
      <CategoryMenu />
      <GridView>
        {parsedProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </GridView>
    </div>
  );
}
