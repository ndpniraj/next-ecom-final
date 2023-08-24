import { auth } from "@/auth";
import startDb from "./db";
import CartModel from "@models/cartModel";
import { Types } from "mongoose";
import { CartItems } from "@app/types";

export const getCartItems = async (
  userId: string,
  cartId: string
): Promise<CartItems> => {
  await startDb();
  const [cartItems] = await CartModel.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
        _id: new Types.ObjectId(cartId),
      },
    },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "items.productId",
        as: "product",
      },
    },
    {
      $project: {
        _id: 0,
        id: { $toString: "$_id" },
        totalQty: { $sum: "$items.quantity" },
        products: {
          id: { $toString: { $arrayElemAt: ["$product._id", 0] } },
          thumbnail: { $arrayElemAt: ["$product.thumbnail.url", 0] },
          title: { $arrayElemAt: ["$product.title", 0] },
          price: { $arrayElemAt: ["$product.price.discounted", 0] },
          qty: "$items.quantity",
          totalPrice: {
            $multiply: [
              "$items.quantity",
              { $arrayElemAt: ["$product.price.discounted", 0] },
            ],
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        id: { $first: "$id" },
        totalQty: { $sum: "$totalQty" },
        totalPrice: { $sum: "$products.totalPrice" },
        products: { $push: "$products" },
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        totalQty: 1,
        totalPrice: 1,
        products: 1,
      },
    },
  ]);

  return cartItems;
};
