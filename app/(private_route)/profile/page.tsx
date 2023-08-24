import EmailVerificationBanner from "@/app/components/EmailVerificationBanner";
import OrderListPublic, { Orders } from "@/app/components/OrderListPublic";
import ProfileForm from "@/app/components/ProfileForm";
import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import UserModel from "@/app/models/userModel";
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const fetchLatestOrder = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/signin");
  }

  await startDb();
  const orders = await OrderModel.find({ userId: session.user.id })
    .sort("-createdAt")
    .limit(1);
  const result: Orders[] = orders.map((order) => {
    return {
      id: order._id.toString(),
      paymentStatus: order.paymentStatus,
      date: order.createdAt.toString(),
      total: order.totalAmount,
      deliveryStatus: order.deliveryStatus,
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

const fetchUserProfile = async () => {
  const session = await auth();
  if (!session) return redirect("/auth/signin");

  await startDb();
  const user = await UserModel.findById(session.user.id);
  if (!user) return redirect("/auth/signin");
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    avatar: user.avatar?.url,
    verified: user.verified,
  };
};

export default async function Profile() {
  const profile = await fetchUserProfile();
  const order = JSON.parse(await fetchLatestOrder());

  return (
    <div>
      <EmailVerificationBanner verified={profile.verified} id={profile.id} />
      <div className="flex py-4 space-y-4">
        <div className="border-r border-gray-700 p-4 space-y-4">
          <ProfileForm
            id={profile.id}
            email={profile.email}
            name={profile.name}
            avatar={profile.avatar}
          />
        </div>

        <div className="p-4 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold uppercase opacity-70 mb-4">
              Your recent orders
            </h1>
            <Link href="/profile/orders" className="uppercase hover:underline">
              See all orders
            </Link>
          </div>

          <OrderListPublic orders={order} />
        </div>
      </div>
    </div>
  );
}
