"use client";

import { Button, Rating } from "@material-tailwind/react";
import { StarIcon as RatedIcon } from "@heroicons/react/24/solid";
import { StarIcon as UnratedIcon } from "@heroicons/react/24/outline";
import React, { useState, FormEventHandler, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  productId: string;
  initialValue?: { rating: number; comment: string };
}

export default function ReviewForm({ productId, initialValue }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

  const submitReview: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { comment, rating } = review;
    if (!rating) {
      return toast.error("Rating is missing!");
    }

    setIsPending(true);
    const res = await fetch("/api/product/review", {
      method: "POST",
      body: JSON.stringify({ comment, rating, productId }),
    });

    const { error } = await res.json();

    setIsPending(false);

    if (!res.ok) {
      return toast.error(error);
    }
  };

  useEffect(() => {
    if (initialValue) setReview({ ...initialValue });
  }, [initialValue]);

  return (
    <form onSubmit={submitReview} className="space-y-2">
      <div>
        <h3 className="font-semibold text-lg mb-1">Overall Rating</h3>
        <Rating
          ratedIcon={<RatedIcon className="h-8 w-8" />}
          unratedIcon={<UnratedIcon className="h-8 w-8" />}
          value={initialValue?.rating || review.rating}
          onChange={(rating) => setReview({ ...review, rating })}
        />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-1">Write a written review</h3>
        <textarea
          placeholder="Write what you like or dislike about the product."
          className="w-full resize-none border p-2 rounded border-blue-gray-500 outline-blue-400 transition"
          rows={4}
          value={review.comment}
          onChange={({ target }) =>
            setReview({ ...review, comment: target.value })
          }
        />
      </div>
      <div className="text-right">
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
