"use client";
import React, { ChangeEventHandler } from "react";
import { TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";

import ImageInput from "@ui/ImageInput";
import SelectedImageThumb from "@ui/SelectedImageThumb";

interface Props {
  id: string;
  images?: string[];
  multiple?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onRemove?(index: number): void;
}

export default function ImageSelector({
  id,
  images,
  onChange,
  onRemove,
  multiple,
}: Props) {
  const icon = multiple ? (
    <div className="relative">
      <PhotoIcon className="w-8 h-8 bg-white" />
      <PhotoIcon className="w-8 h-8 absolute -top-2 -right-2 -z-10" />
    </div>
  ) : (
    <PhotoIcon className="w-8 h-8" />
  );

  return (
    <div className="flex items-center space-x-4">
      {images?.map((img, index) => {
        return (
          <div key={index} className="relative">
            <SelectedImageThumb src={img} />
            {multiple ? (
              <div
                onClick={() => onRemove && onRemove(index)}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded cursor-pointer"
              >
                <TrashIcon className="w-4 h-4" />
              </div>
            ) : null}
          </div>
        );
      })}

      <ImageInput id={id} onChange={onChange} multiple={multiple}>
        {icon}
      </ImageInput>
    </div>
  );
}
