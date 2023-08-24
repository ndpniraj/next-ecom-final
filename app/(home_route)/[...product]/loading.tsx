import React from "react";

export default function LoadingSingleProduct() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex lg:flex-row flex-col md:gap-4 gap-2">
        <div className="flex-1 lg:self-start self-center">
          {/* for image */}
          <div className="w-full aspect-square bg-gray-300" />

          {/* for image gallery */}
          <div className="flex items-center space-x-4 my-4">
            <div className="w-20 aspect-square bg-gray-300" />
            <div className="w-20 aspect-square bg-gray-300" />
            <div className="w-20 aspect-square bg-gray-300" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {/* for title */}
          <div className="space-y-4">
            <div className="w-full h-4 aspect-square bg-gray-300" />
            <div className="w-1/2 h-4 aspect-square bg-gray-300" />
          </div>

          {/* for description */}
          <div className="space-y-4">
            <div className="w-full h-2 aspect-square bg-gray-300" />
            <div className="flex space-x-4">
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
            </div>
          </div>

          <div className="px-4 space-y-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <div className="w-1/2 h-2 aspect-square bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
