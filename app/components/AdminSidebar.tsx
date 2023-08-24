"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import {
  Squares2X2Icon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  SparklesIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import SignOutButton from "@components/SignOutButton";

interface Props {
  children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between bg-cyan-600 h-screen sticky top-0 w-64 p-10">
        <ul className="space-y-4 text-white">
          <li>
            <Link
              className="font-semibold text-lg text-white"
              href="/dashboard"
            >
              Ecommerce
            </Link>
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/dashboard">
              <Squares2X2Icon className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/products">
              <ShoppingCartIcon className="w-4 h-4" />
              <span>Products</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link
              className="flex items-center space-x-1"
              href="/products/featured/add"
            >
              <SparklesIcon className="w-4 h-4" />
              <span>Featured</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/sales">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span>Sales</span>
            </Link>
            <hr className="w-full " />
          </li>
          <li>
            <Link className="flex items-center space-x-1" href="/orders">
              <ShoppingBagIcon className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <hr className="w-full " />
          </li>
        </ul>

        <div>
          <SignOutButton>
            <div className="cursor-pointer text-white">Logout</div>
          </SignOutButton>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex-1 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
