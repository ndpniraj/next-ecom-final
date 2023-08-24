import OrderCard, { Order } from "@/app/components/OrderCard";
import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import { ObjectId } from "mongoose";
import React from "react";

const fetchOrders = async () => {
  await startDb();
  const orders = await OrderModel.find()
    .sort("-createdAt")
    .limit(5)
    .populate<{
      userId: {
        _id: ObjectId;
        name: string;
        email: string;
        avatar?: { url: string };
      };
    }>({
      path: "userId",
      select: "name email avatar",
    });

  const result: Order[] = orders.map((order): Order => {
    return {
      id: order._id.toString(),
      deliveryStatus: order.deliveryStatus,
      subTotal: order.totalAmount,
      customer: {
        id: order.userId._id.toString(),
        name: order.userId.name,
        email: order.userId.email,
        address: order.shippingDetails.address,
        avatar: order.userId.avatar?.url,
      },
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

export default async function Orders() {
  const result = await fetchOrders();
  const orders = JSON.parse(result) as Order[];

  return (
    <div className="py-4 space-y-4">
      {orders.map((order) => {
        return <OrderCard order={order} key={order.id} disableUpdate={false} />;
      })}
    </div>
  );
}
