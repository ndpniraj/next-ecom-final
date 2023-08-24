"use server";

import startDb from "@/app/lib/db";
import FeaturedProductModel from "@/app/models/featuredProduct";
import { FeaturedProductForUpdate, NewFeaturedProduct } from "@/app/types";
import { removeImageFromCloud } from "../action";

export const createFeaturedProduct = async (info: NewFeaturedProduct) => {
  try {
    await startDb();
    await FeaturedProductModel.create({ ...info });
  } catch (error) {
    throw error;
  }
};

export const updateFeaturedProduct = async (
  id: string,
  info: FeaturedProductForUpdate
) => {
  try {
    await startDb();
    await FeaturedProductModel.findByIdAndUpdate(id, { ...info });
  } catch (error) {
    throw error;
  }
};

export const deleteFeaturedProduct = async (id: string) => {
  try {
    await startDb();
    const product = await FeaturedProductModel.findByIdAndDelete(id);
    if (product) {
      await removeImageFromCloud(product.banner.id);
    }
  } catch (error) {
    throw error;
  }
};
