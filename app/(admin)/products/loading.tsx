import React from "react";

const TABLE_HEAD = [
  "Product",
  "MRP",
  "Sale Price",
  "Quantity",
  "Category",
  "Edit",
];

export default function ProductsLoading() {
  const dummyProducts = Array(10).fill("");

  return (
    <div className="py-5 animate-pulse">
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="w-36 h-10 bg-gray-300" />
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <div className="w-96 h-10 bg-gray-300" />
        </div>
      </div>
      <div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <p className="text-blue-gray-500 font-normal leading-none opacity-70">
                    {head}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyProducts.map((_, index) => {
              const isLast = index === dummyProducts.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="w-20 aspect-square rounded-full bg-gray-300" />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-20 h-4 bg-gray-300" />
                  </td>
                  <td className={classes}>
                    <div className="w-20 h-4 bg-gray-300" />
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <div className="w-20 h-4 bg-gray-300" />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <div className="w-20 h-4 bg-gray-300" />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-2 h-4 bg-gray-300" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
