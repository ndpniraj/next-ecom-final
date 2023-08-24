import ReviewStars from "@/app/components/ReviewStars";
import Image from "next/image";
import React from "react";

export interface RecentReviews {
  id: string;
  rating: number;
  date: string;
  product: {
    id: string;
    title: string;
    thumbnail: string;
  };
  user: {
    name: string;
  };
}

interface Props {
  reviews: RecentReviews[];
}

const RecentReviewsList = ({ reviews }: Props) => {
  return (
    <div className="space-y-4 w-96 rounded overflow-hidden shadow-lg">
      <h2 className="bg-blue-gray-600 text-white p-2 font-semibold text-lg">
        Recent Reviews
      </h2>

      <div className="px-4 space-y-4">
        {reviews.map((review) => {
          return (
            <div key={review.id}>
              <div className="flex space-x-1">
                <Image
                  src={review.product.thumbnail}
                  width={50}
                  height={50}
                  alt={review.product.title}
                />
                <div>
                  <p className="line-clamp-1">{review.product.title}</p>
                  <div className="flex items-center space-x-1">
                    <ReviewStars rating={review.rating} />
                    <span>by {review.user.name}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentReviewsList;
