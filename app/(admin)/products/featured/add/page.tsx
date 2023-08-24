import FeaturedProductForm from "@/app/components/FeaturedProductForm";
import FeaturedProductTable from "@/app/components/FeaturedProductTable";
import startDb from "@/app/lib/db";
import FeaturedProductModel from "@/app/models/featuredProduct";
import React from "react";

const fetchFeaturedProducts = async () => {
  await startDb();
  const products = await FeaturedProductModel.find();
  return products.map((product) => {
    return {
      id: product._id.toString(),
      title: product.title,
      link: product.link,
      linkTitle: product.linkTitle,
      banner: product.banner.url,
    };
  });
};

export default async function AddFeaturedProduct() {
  const featuredProducts = await fetchFeaturedProducts();
  return (
    <div>
      <FeaturedProductForm />
      <FeaturedProductTable products={featuredProducts} />
    </div>
  );
}
