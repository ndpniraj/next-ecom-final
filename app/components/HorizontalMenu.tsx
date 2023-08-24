"use client";
import { Chip } from "@material-tailwind/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import categories from "../utils/categories";
import Link from "next/link";
import "react-horizontal-scrolling-menu/dist/styles.css";

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      className="px-2 transition"
      disabled={isFirstItemVisible}
      style={{ opacity: isFirstItemVisible ? "0" : "1" }}
      onClick={() => scrollPrev()}
    >
      <ChevronLeftIcon className="w-4 h-4" />
    </button>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <button
      className="px-2 transition"
      style={{ opacity: isLastItemVisible ? "0" : "1" }}
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
    >
      <ChevronRightIcon className="w-4 h-4" />
    </button>
  );
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function HorizontalMenu({ children }: Props) {
  return (
    <div>
      <ScrollMenu
        wrapperClassName="w-full"
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {children}
      </ScrollMenu>
    </div>
  );
}
