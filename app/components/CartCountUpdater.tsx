"use client";

import { IconButton } from "@material-tailwind/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/outline";

interface Props {
  value: number;
  onDecrement?(): void;
  onIncrement?(): void;
  disabled?: boolean;
}

const CartCountUpdater = ({
  onDecrement,
  onIncrement,
  disabled,
  value,
}: Props) => {
  return (
    <div
      style={{ opacity: disabled ? "0.5" : "1" }}
      className="flex items-center space-x-2"
    >
      <IconButton disabled={disabled} onClick={onDecrement} variant="text">
        <MinusSmallIcon className="w-4 h-4" />
      </IconButton>

      <span className="text-lg font-medium">{value}</span>
      <IconButton disabled={disabled} onClick={onIncrement} variant="text">
        <PlusSmallIcon className="w-4 h-4" />
      </IconButton>
    </div>
  );
};

export default CartCountUpdater;
