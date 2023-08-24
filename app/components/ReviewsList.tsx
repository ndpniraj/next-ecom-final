import React from "react";
import Image from "next/image";
import dateFormat from "dateformat";
import ReviewStars from "@components/ReviewStars";

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
  userInfo: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface Props {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: Props) {
  return (
    <div className="space-y-4">
      {reviews?.map((review) => {
        return (
          <div className="space-y-2" key={review.id}>
            <div className="flex items-center space-x-2">
              <Image
                width={40}
                height={40}
                className="rounded-full object-fill"
                src={review.userInfo.avatar || "/avatar.png"}
                alt={review.userInfo.name}
              />
              <div>
                <p className="font-semibold">{review.userInfo.name}</p>
                <p className="text-xs">
                  {dateFormat(review.date, "dd mmm  yyyy")}
                </p>
              </div>
            </div>
            <div>
              <ReviewStars rating={review.rating} />
              <p>{review.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
