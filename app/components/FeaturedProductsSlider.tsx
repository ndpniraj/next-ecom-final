"use client";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface FeaturedProduct {
  id: string;
  banner: string;
  title: string;
  link: string;
  linkTitle: string;
}

interface Props {
  products: FeaturedProduct[];
}

const settings: Settings = {
  dots: true,
  lazyLoad: "anticipated",
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
};

export default function FeaturedProductsSlider({ products }: Props) {
  const router = useRouter();

  if (!products.length) return null;

  return (
    <div className="lg:h-[380px] md:h-[300px] h-[250px]">
      <Slider {...settings}>
        {products.map(({ banner, title, link, linkTitle }, index) => {
          return (
            <div className="select-none relative" key={index}>
              <div className="w-full lg:h-[380px] md:h-[300px] h-[250px]">
                <Image fill src={banner} alt={title} />
              </div>
              <div className="absolute inset-0 p-5">
                <div className="md:w-1/2 w-full h-full flex flex-col items-start justify-center">
                  <h1 className="lg:text-3xl md:text-2xl text-lg font-semibold text-left mb-2">
                    {title}
                  </h1>
                  <Button color="blue-gray" onClick={() => router.push(link)}>
                    {linkTitle}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
