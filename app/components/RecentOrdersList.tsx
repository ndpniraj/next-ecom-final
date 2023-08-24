import Link from "next/link";
import React from "react";
import truncate from "truncate";

export interface RecentOrders {
  id: string;
  products: { title: string }[];
  customerInfo: {
    name: string;
  };
}

interface Props {
  orders: RecentOrders[];
}

const RecentOrdersList = ({ orders }: Props) => {
  return (
    <div className="space-y-4 w-96 rounded overflow-hidden shadow-lg">
      <div className="bg-blue-gray-600 text-white p-2 flex justify-between items-center">
        <h2 className="font-semibold text-lg">Recent Orders</h2>
        <Link href="/orders">See all</Link>
      </div>

      <div className="p-4 space-y-4">
        {orders.map(({ id, products, customerInfo }) => {
          const extraProductsLength = products.length - 1;

          return (
            <div key={id} className="border-b border-blue-gray-300">
              <div>
                {truncate(products[0].title, 40)}{" "}
                {extraProductsLength > 0
                  ? `and ${extraProductsLength} more items.`
                  : ""}
              </div>
              <div className="text-sm text-right">By {customerInfo.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentOrdersList;
