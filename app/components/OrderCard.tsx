"use client";

import { Avatar, Option, Select } from "@material-tailwind/react";
import Image from "next/image";
import React, { useTransition } from "react";
import { formatPrice } from "../utils/helper";

type product = {
  id: string;
  title: string;
  thumbnail: string;
  totalPrice: number;
  price: number;
  qty: number;
};

export interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    address: { [key: string]: string | null };
  };
  subTotal: number;
  products: product[];
  deliveryStatus: string;
}

interface Props {
  order: Order;
  disableUpdate?: boolean;
}

type address = {
  city: string;
  country: string;
  line1: string;
  line2: string | null;
  postal_code: string;
  state: string;
};

const ORDER_STATUS = ["delivered", "ordered", "shipped"];

const formatAddress = ({
  line1,
  line2,
  city,
  country,
  state,
  postal_code,
}: address): JSX.Element => {
  return (
    <div>
      <p className="font-semibold">
        Line 1: <span className="font-normal">{line1}</span>
      </p>
      {line2 ? (
        <p className="font-semibold">
          Line 2: <span className="font-normal">{line2}</span>
        </p>
      ) : null}
      <div className="flex items-center space-x-2">
        <p className="font-semibold">
          State: <span className="font-normal">{state}</span>
        </p>
        <p className="font-semibold">
          City: <span className="font-normal">{city}</span>
        </p>
        <p className="font-semibold">
          Pcode: <span className="font-normal">{postal_code}</span>
        </p>
        <p className="font-semibold">{country}</p>
      </div>
    </div>
  );
};

export default function OrderCard({ order, disableUpdate = true }: Props) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="space-y-4 rounded border-blue-gray-800 border border-dashed p-2">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Avatar src={order.customer.avatar || "/avatar.png"} />
          <div>
            <p className="font-semibold">{order.customer.name}</p>
            <p className="text-sm">{order.customer.email}</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Sub-Total</p>
          <p className="text-sm font-semibold">{formatPrice(order.subTotal)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">Address</p>
          <div className="text-sm">
            {formatAddress(order.customer.address as any)}
          </div>
        </div>
        <div>
          <Select
            disabled={disableUpdate || isPending}
            value={order.deliveryStatus}
            className="uppercase"
            label="Delivery Status"
            onChange={(deliveryStatus) => {
              startTransition(async () => {
                await fetch("/api/order/update-status", {
                  method: "POST",
                  body: JSON.stringify({ orderId: order.id, deliveryStatus }),
                });
              });
            }}
          >
            {ORDER_STATUS.map((op) => (
              <Option value={op} className="uppercase" key={op}>
                {op}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Product</th>
            <th className="py-2 px-4 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product, index) => (
            <tr
              key={product.id}
              style={
                index < order.products.length - 1
                  ? { borderBottom: "1px solid gray" }
                  : undefined
              }
            >
              <td className="py-2 px-4">
                <div className="flex space-x-2">
                  <Image
                    src={product.thumbnail}
                    width={50}
                    height={50}
                    alt={product.title}
                  />
                  <div>
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-sm">
                      Price: {formatPrice(product.price)}
                    </p>
                    <p className="text-sm">Qty: {product.qty}</p>
                  </div>
                </div>
              </td>

              <td className="py-2 px-4">{formatPrice(product.totalPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
