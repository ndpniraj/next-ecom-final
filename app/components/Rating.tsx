import React from "react";
import StarIcon from "@ui/StarIcon";

interface Props {
  value: number;
}

export default function Rating({ value }: Props) {
  const data = Array(5).fill("");
  const fullStarts = Math.floor(value);
  const halfStar = value - fullStarts >= 0.1;
  return (
    <div className="flex items-center space-x-0.5">
      {data.map((_, index) => {
        return index + 1 <= fullStarts ? (
          <StarIcon.Full key={index} />
        ) : halfStar && index === fullStarts ? (
          <StarIcon.Half key={index} />
        ) : (
          <StarIcon.Empty key={index} />
        );
      })}
      <span className="font-semibold text-xs">{value}</span>
    </div>
  );
}
