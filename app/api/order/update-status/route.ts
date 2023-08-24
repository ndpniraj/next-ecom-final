import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

const validStatus = ["delivered", "ordered", "shipped"];

export const POST = async (req: Request) => {
  const session = await auth();

  const user = session?.user;

  if (user?.role !== "admin")
    return NextResponse.json(
      { error: "unauthorized request!" },
      { status: 401 }
    );

  const { orderId, deliveryStatus } = await req.json();

  if (!isValidObjectId(orderId) || !validStatus.includes(deliveryStatus))
    return NextResponse.json({ error: "Invalid data!" }, { status: 401 });

  await startDb();
  await OrderModel.findByIdAndUpdate(orderId, { deliveryStatus });

  return NextResponse.json({ success: true });
};
