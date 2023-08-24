import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface Props {
  isActive?: boolean;
}

export default function Wishlist({ isActive }: Props) {
  return isActive ? (
    <HeartIconSolid className="w-6 h-6 text-red-500" />
  ) : (
    <HeartIcon className="w-6 h-6" />
  );
}
